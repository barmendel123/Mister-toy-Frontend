import { useEffect } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormRegister } from '../hooks/useFormRegister.js'
import { addReview } from '../store/actions/review.action.js'
import { userService } from '../services/user.service.js'

export const ReviewEdit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, setText, text] = useFormRegister({
        text: ''
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const onSaveReview = async (ev) => {
        ev.preventDefault()
        const userId = userService.getLoggedinUser()._id;
        // console.log(userId)
        const review = { content: text.text, toyId: params.id, userId }
        // console.log(review)
        await dispatch(addReview(review))
        navigate(`/toy/${params.id}`)

    }

    return (
        <section className='review-edit flex column align-center'>
            <h1>Add Review</h1>
            <form className='flex column align-center' onSubmit={onSaveReview}>
                <textarea ref={inputRef} {...register('text', 'text')} cols="30" rows="10"></textarea>
                <button>Add</button>
            </form>
        </section>
    )
}
