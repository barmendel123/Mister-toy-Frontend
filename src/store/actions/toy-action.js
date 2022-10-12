import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { toyService } from "../../services/toy.service"

export function loadToys() {

    return async (dispatch, getState) => {
        const { filterBy } = getState().toyModule
        try {
            // console.log('filterBy aaaaa:', filterBy);
            const toys = await toyService.query(filterBy)
            // console.log('toys', toys);
            dispatch({ type: 'SET_TOYS', toys })
        }
        catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeToy(toyId) {
    return async (dispatch, getState) => {
        try {
            await toyService.remove(toyId)
            dispatch({ type: 'REMOVE_TOY', toyId })
            showSuccessMsg('Toy removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove toy')
            console.log('Cannot remove toy', err)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}
