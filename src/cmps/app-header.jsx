import { userService } from "../services/user.service"
import { logout } from "../store/actions/user.action"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom";

export function AppHeader() {

    const dispatch = useDispatch()

    const { loggedInUser } = useSelector(state => state.userModule)
    // console.log('loggedInUser', loggedInUser);

    const onLgout = () => {
        dispatch(logout())
    }

    return <div className="app-header flex space-between ">
        <Link to='/' >
            <div className="logo">Toys App</div>
        </Link>
        <div className="flex column">
            {loggedInUser && <a>Hello {loggedInUser.fullname}</a>}
            </div>

        <nav>
            {loggedInUser && <Link to='/'> <button onClick={() => onLgout() }> Logout </button></Link>}
            <NavLink to=''>Home</NavLink>
            <NavLink to='/about' >About</NavLink>
            <NavLink to='/toy' >Toys</NavLink>
            
        </nav>

    </div>

}