import { Link } from 'react-router-dom'


export function ToysPreview({ toy, onRemoveToy }) {
    return <section className="toy-preview">
        <Link to={`/toy/${toy._id}`} className='info'>
            <h4>{toy.name}</h4>
            <img className='toy-img' src={require(`../assets/imgs/toys-imgs/${toy.img}.png`)} alt="IMG" />
            <h6>Price: {toy.price}$</h6>
        </Link>
        <section className='actions'>
            <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
            <Link to={`/toy/edit/${toy._id}`} >Edit</Link>
        </section>
    </section>

}