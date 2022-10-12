import { httpService } from './http.service.js'
import { store } from '../store/index'
import { getActionSetWatchedUser } from '../store/actions/review.action'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from '../services/event-bus.service'





export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
}

const BASE_URL = "auth/"
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

window.us = userService

async function login(credentials) {
    try {
        const user = await httpService.post(BASE_URL + 'login', credentials)
        if (user) return _saveToStorage(user)
    } catch (err) {
        console.error(err)
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post(BASE_URL + 'signup', credentials)
        return _saveToStorage(credentials)
    } catch (err) {
        console.error(err)
    }
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    return _saveToStorage(null)
}

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveToStorage(user)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)

    socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return user
}

function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch(getActionSetWatchedUser(user))
}

function getLoggedinUser() {
   return _loadFromStorage()
}

function _saveToStorage(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

function _loadFromStorage () {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}
