import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadReviews, addReview, removeReview } from '../store/actions/review.action.js'

export const ReviewApp = () => {
    const dispatch = useDispatch()
    const { reviews } = useSelector(state => state.reviewModule)
    const { loggedInUser } = useSelector(state => state.userModule)

    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })

    useEffect(() => {
        dispatch(loadReviews())
    }, [])

    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }


    const onRemove = async reviewId => {
        try {
            await dispatch(removeReview(reviewId))
        } catch (err) {
            console.error('Cannot remove')
        }
    }

    const isRemovable = review =>
        (review.user._id === loggedInUser?._id || loggedInUser?.isAdmin)

    return (
        <div className="review-app">
            <h1>Reviews</h1>
            <hr />
            {reviews && <section className="review-list">
                {reviews.map(review => (
                    <ul className='clean-list' key={review._id}>
                        <li>
                            {isRemovable(review) &&
                                <button className='delete-review-btn' onClick={() => onRemove(review._id)}>X</button>}
                            <section>
                                Toy:
                                <Link to={`/toy/${review.toy._id}`}>
                                    {review.toy.name}
                                  
                                </Link>
                            </section>
                            <section>
                                User:
                                <Link to={`/user/${review.user._id}`}>
                                    {review.user.fullname}
                                </Link>
                            </section>review:
                            <span className='text-review'> {review.content}</span>

                            <section>Created At:
                            <span className='text-review'> {new Date(review.createdAt).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}</span>
                            </section>
                        </li>
                    </ul>
                ))}
            </section>}
        </div>
    )
}