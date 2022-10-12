import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
//prettier-ignore
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_IS_TYPING, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function ChatApp() {
    const params = useParams()
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(params.id)
    const [isTypingTxt, setTypingTxt] = useState()

    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)

    // const [isBotMode, setIsBotMode] = useState(false)
    // let botTimeout

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_IS_TYPING, userIsTyping)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            // botTimeout && clearTimeout(botTimeout)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    const addMsg = (newMsg) => {
        setMsgs((prevMsgs) => [...prevMsgs, newMsg])
        // setMsgs([...msgs, newMsg])
    }
    // const sendBotResponse = () => {
    //   // Handle case: send single bot response (debounce).
    //   botTimeout && clearTimeout(botTimeout)
    //   botTimeout = setTimeout(() => {
    //     setMsgs((prevMsgs) => [
    //       ...prevMsgs,
    //       { from: 'Bot', txt: 'You are amazing!' },
    //     ])
    //   }, 1500)
    // }

    const userIsTyping = (user) => {
        setTypingTxt(`${user.fullname} is typing..`)
        setTimeout(() => {
            setTypingTxt('')
        }, 2000)
    }

    const sendMsg = (ev) => {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        socketService.emit(SOCKET_EMIT_SEND_MSG, { from, txt: msg.txt })
        // if (isBotMode) sendBotResponse()
        setMsg({ txt: '' })
    }

    const handleFormChange = (ev) => {
        const { name, value } = ev.target
        setMsg((prevMsg) => ({ ...prevMsg, [name]: value }))
        socketService.emit(SOCKET_IS_TYPING,  loggedInUser || 'No One')
    }

    return (
        <section className="chat-app">
            <h2>Lets Chat about this toy</h2>
            <form onSubmit={sendMsg}>
                <input
                    type="text"
                    value={msg.txt}
                    onChange={handleFormChange}
                    name="txt"
                    autoComplete="off"
                />
                <button>Send</button>
            </form>
            <span>{isTypingTxt}</span>
            <ul>
                {msgs.map((msg, idx) => (
                    <li key={idx}>
                        {msg.from}: {msg.txt}
                    </li>
                ))}
            </ul>
        </section>
    )
}


