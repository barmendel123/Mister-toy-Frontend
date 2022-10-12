import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from "react"

import { connect } from 'react-redux'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'


import { loadUsers, removeUser } from '../store/actions/user.action'


export const AdminApp = () => {

    const { users } = useSelector(state => state.userModule)
    const { isLoading } = useSelector(state => state.systemModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUsers())
    }, [])

    const onLoadUsers = () => {
        dispatch(loadUsers())
    }

    const onRemoveToy = (userId) => {
        dispatch(removeUser(userId))
    }

    // const { isLoading, users, removeUser, loadUsers } = this.props
    // console.log('users from cmp', users);
    console.log('users from cmp', users);
    return <section className="admin">
        <Button onClick={onLoadUsers}>Refresh Users</Button>| 
        <Link to='/toy'><Button>Return </Button></Link>
        {isLoading && 'Loading...'}

        {users && <ul>

            {users.map(user => (
                <li key={user._id}>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    <button
                        onClick={() => {
                            onRemoveToy(user._id)
                        }}
                    >
                        Remove {user.username}
                    </button>
                </li>
            ))}
        </ul>}
    </section>


}



