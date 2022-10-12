import { userService } from "../../services/user.service"


const INITIAL_STATE = {
    loggedInUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = INITIAL_STATE, action) {
    // var newState = state;
    switch (action.type) {

        case 'SET_USER':
            console.log(action.user)
            return { ...state, loggedInUser: action.user }

        case 'SET_USERS':
            return { ...state, users: action.users }

        case 'SET_WATCHED_USER':
            return { ...state, watchedUser: action.user }

        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }

        default:
            return state
    }
}