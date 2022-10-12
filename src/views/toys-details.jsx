import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { ChatApp } from '../cmps/chat-cmp'

export const ToyDetails = () => {

    const [toy, setToy] = useState(null)
    const { reviews } = useSelector(state => state.reviewModule)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [params.id])

    const loadToy = () => {
        const toyId = params.id
        toyService.getById(toyId).then(toy => {
            setToy(toy)
        })
    }
    const onBack = () => {
        navigate('/toy')
    }

    if (!toy) return <div>Loading...</div>
    // console.log('reviews', reviews);
    // console.log('toys', toy);
    return (
        <div className='robot-details'>
            <section>
                <h3>Name: {toy.name}</h3>
            </section>
            <section>
                <h3>Price: {toy.price}</h3>
            </section>
            <section>
                <h3>Label: {toy.labels}</h3>
            </section>
            <img className='toy-img' src={require(`../assets/imgs/toys-imgs/${toy.img}.png`)} alt="IMG" />

            <section>
                <h3>Published: {new Date(toy.createdAt).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}</h3>
            </section>

            <section>
                <h3>In Stock: {toy.inStock? <span>Yes</span> : <span>No</span>}</h3>
            </section>
            <section>
                {toy.reviews && <ul>
                    {toy.reviews.map(review => {
                        return <li key={review.id}>{review.creator}: {review.stars}</li>
                    })}
                </ul>}
            </section>
            <ChatApp toy={toy} />
            <Link to="review/edit"><button>Add Review</button></Link>
            <button onClick={onBack}>Back</button>
        </div>
    )
}