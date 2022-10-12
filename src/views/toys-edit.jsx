import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { showSuccessMsg } from '../services/event-bus.service'

import { toyService } from "../services/toy.service"



export const ToyEdit = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [toy, handleChange, setToy] = useForm({
        name: '',
        price: '',
        labels: []
    })

    
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        const toyId = params.id
        if (!toyId) return
            ; (async () => {
                try {
                    const toy = await toyService.getById(toyId)
                    setToy(toy)
                }
                catch (err) {
                    console.log('err:', err)
                }
            }
            )()
    }, [])


    const onSaveToy = (ev) => {
        ev.preventDefault()
        toyService.save({ ...toy }).then(() => {
            navigate('/toy')
            showSuccessMsg('Toy Added')
        })
    }


return(
    <section className='robot-edit'>
            <h1>{toy._id ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name</label>
                <input ref={inputRef} value={toy.name} onChange={handleChange} type="text" name="name" id="name" />

                <label htmlFor="price">Price</label>
                <input  value={toy.price} onChange={handleChange} type="number" name="price" id="price" />

                <label htmlFor="labels">Label</label>
                <select value={toy.label} onChange={handleChange} name="labels" id="labels">
                    <option disabled value="">Choose label</option>
                    <option value="On wheels">On wheels</option>
                    <option value="Box game">Box game</option>
                    <option value="Art">Art</option>
                    <option value="Baby">Baby</option>
                    <option value="Doll">Doll</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Outdoor">Outdoor</option>
                </select>

                <button>Save</button>
            </form>
        </section>
)
}