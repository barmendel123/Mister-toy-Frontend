import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Home = () => {
    const { loggedInUser } = useSelector(state => state.userModule)
    console.log('loggedInUser', loggedInUser);

    return <section className="home flex column justify-center align-center">
        <h1>Welcome To Mister Toy</h1>
        <h3>Toy Store</h3>
        {!loggedInUser && <Link to="/login">Please Login</Link>}
        
    </section>
}