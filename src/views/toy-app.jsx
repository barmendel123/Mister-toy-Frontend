import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToysList } from "../cmps/toys-list"
import { loadToys, removeToy, setFilterBy } from "../store/actions/toy-action"
import { Link } from 'react-router-dom'
import { ToyFilter } from "../cmps/toy-filter"
import { userService } from "../services/user.service"
import { Footer } from "../cmps/footer"


export const ToysApp = () => {

    const { loggedInUser } = useSelector(state => state.userModule)
    const { toys } = useSelector(state => state.toyModule)
    const dispatch = useDispatch()

    // console.log('loggedInUser', loggedInUser);
    useEffect(() => {
        dispatch(loadToys())
    }, [])

    const onRemoveToy = (toyId) => {
        dispatch(removeToy(toyId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadToys())
    }

    // const onLgout = () => {
    //     dispatch(logout())
    // }

    if (!toys) return <div>loading.....</div>
    // console.log('loggedInUser', loggedInUser);
    return (
        <div className='robot-app'>
            <ToyFilter onChangeFilter={onChangeFilter} />
            <div className="flex space-between">
                <button className="add-toy-btn"> <Link to="/toy/edit">Add Toy</Link></button>
                <div>
                    {loggedInUser ? loggedInUser.isAdmin && <button className="add-toy-btn"> <Link to="/admin">Admin Area</Link></button> :
                        <h2></h2>}
                    <button className="add-toy-btn"> <Link to="/review">All Reviews</Link></button>
                </div>
            </div>
            <ToysList toys={toys} onRemoveToy={onRemoveToy} />
            <Footer />
        </div>
    )
}