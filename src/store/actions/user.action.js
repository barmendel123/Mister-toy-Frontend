import { userService } from "../../services/user.service"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"

// login
export function login(loggedInUser) {
    return async (dispatch) => {
        try {
            const user = await userService.login(loggedInUser)
            if (user) dispatch({ type: 'SET_USER', user })
            showSuccessMsg('login')
        } catch (err) {
            // showErrorMsg('Cannot login')
            console.error(err)
        }
    }
}

//signup
export function signup(loggedInUser) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(loggedInUser)
            if (user) dispatch({ type: 'SET_USER', user })
            showSuccessMsg('signed up')
        } catch (err) {
            // showErrorMsg('Cannot signup')
            console.error(err)
        }
    }
}

//logout
export function logout() {
    return async (dispatch) => {
        try {
            const user = await userService.logout()
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.error('Oops:', err)
        }
    }
}

export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            // console.log('users', users);
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function loadUser(userId) {
    return async (dispatch) => {
        try {
            const user = await userService.getById(userId);
            dispatch({ type: 'SET_WATCHED_USER', user })
        } catch (err) {
            // showErrorMsg('Cannot load user')
            console.log('Cannot load user', err)
        }
    }
}
