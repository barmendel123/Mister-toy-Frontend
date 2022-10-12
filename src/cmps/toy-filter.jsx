import { useEffect, useState } from 'react'
import { useFormRegister } from '../hooks/useFormRegister'
import { toyService } from '../services/toy.service'

export const ToyFilter = ({ onChangeFilter }) => {

    const [register] = useFormRegister({
        name: '',
        inStock: true,
        label: '',
        sortBy: ''
    }, onChangeFilter)

    const labels = toyService.getLabes()
    return (
            <form className="toy-filter">
                <section>
                    <label htmlFor="name">Name</label>
                    <input {...register('name', 'text')} />
                </section>
                <section>
                    <label htmlFor="inStock">in stock</label>
                    <input className='check-box' {...register('inStock', 'checkbox')} />
                </section>
                <section>
                    <label htmlFor="label">label</label>
                    <select {...register('label', 'select')}>
                        <option value="">Choose a label</option>
                        {
                            labels.map(label => <option key={label} value={label}>{label}</option>)
                        }
                    </select>
                </section>
                <section>

                    <label htmlFor="sortBy">sort by</label>
                    <select {...register('sortBy', 'select')}>
                        <option value="">Choose sorting</option>
                        <option value="name">name</option>
                        <option value="price">price</option>
                        <option value="created">created</option>
                    </select>
                </section>
            </form>
    )
}