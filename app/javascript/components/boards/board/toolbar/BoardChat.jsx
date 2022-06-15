import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Draggable from "react-draggable";
import {getMessages} from "../../messages_actions";
import {useParams} from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const BoardChat = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [haveLastMessage, setHaveLastMessage] = useState(false)
    const [socketId, setSocketId] = useState(null)
    const [unreadMessages, setUnreadMessages] = useState(0)
    const chatMessages = useRef()
    let { id } = useParams();

    useEffect(() => {
        getMessages(id).then(messages => {
            setMessages(messages.data)
            setHaveLastMessage(messages.is_last)
        })
        const pusher = window.pusher
        pusher.connection.bind("connected", () => {
            setSocketId(pusher.connection.socket_id);
        });
    }, [])

    useEffect(() => { scrollToBottom(); setUnreadMessages(0) }, [isOpen])

    useEffect(() => {
        const channel = pusher.subscribe(`chat-channel-${id}`);
        channel.bind('add-message', message => {
            setMessages([...messages, message])
            if (!isOpen) {
                setUnreadMessages(unreadMessages + 1)
            } else {
                scrollToBottom()
            }
        });

        return () => {
            window.pusher.unsubscribe(`chat-channel-${id}`)
        }
    }, [messages, isOpen, unreadMessages])

    const loadOlderMessages = () => {
        const firstMessageId = messages[0].id
        getMessages(id, firstMessageId).then(oldMessages => {
            setMessages([...oldMessages.data, ...messages])
            setHaveLastMessage(oldMessages.is_last)
            const message = document.querySelector(`.chat-message[data-message-id='${firstMessageId}']`)
            message.scrollIntoView()
        })
    }

    const scrollToBottom = () => {
        chatMessages.current.scrollTop = chatMessages.current.scrollHeight
    }

    return (
        <>
            <div onClick={() => { setIsOpen(!isOpen) }} className="border border-1 border-rounded px-2 py-1 cursor-pointer border-color-inherit">
                <i className="far fa-comment-alt border-1 me-1"></i>
                <span>Chat</span>
                { unreadMessages > 0 && <span className="toolbar-bg toolbar-color-reverse rounded-circle px-1 ms-2">{unreadMessages}</span> }
            </div>
            <div className={`full-window ${ isOpen ? '' : 'd-none'}`}>
                <Draggable
                    handle={'.chat-header'}
                    bounds={'parent'}
                    defaultPosition={{x: window.innerWidth - 350, y: 100}}
                >
                    <div className="chat card" style={{width: '300px', height: '400px', color: '#000'}}>
                        <div className="card-header chat-header d-flex justify-content-between align-items-center">
                            <div>Chat</div>
                            <div className="text-big cursor-pointer" onClick={() => { setIsOpen(false) }}>
                                <i className={'fas fa-times'}></i>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column" style={{maxHeight: '360px'}}>
                            <div ref={chatMessages} className="chat-messages overflow-y-auto mb-2 h-100">
                                { !haveLastMessage && (
                                    <div onClick={loadOlderMessages} className="text-center text-primary cursor-pointer">
                                        See older messages?
                                    </div>
                                )}
                                {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                            </div>
                            <ChatInput boardId={id} messages={messages} setMessages={setMessages} socketId={socketId} scrollToBottom={scrollToBottom} />
                        </div>
                    </div>
                </Draggable>
            </div>
        </>
    );
};

export default BoardChat;
