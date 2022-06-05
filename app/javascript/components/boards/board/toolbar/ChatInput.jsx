import React, {useState} from 'react';
import {addMessage} from "../../messages_actions";
import {useParams} from "react-router-dom";

const ChatInput = ({boardId, messages, setMessages, socketId, scrollToBottom}) => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        addMessage(message, boardId, socketId).then((message) => {
            setMessages([...messages, message])
            scrollToBottom()
        })

        setMessage('')
    }

    return (
        <div className={'input-group d-flex'}>
            <input placeholder={'Message'} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendMessage()}} type="text" className={'form-control flex-grow-1 text-small outline-none'} />
            <div className="input-group-text cursor-pointer" onClick={sendMessage}>
                <i className="far fa-paper-plane"></i>
            </div>
        </div>
    );
};

export default ChatInput;
