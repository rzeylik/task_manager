import React from 'react';
import UserCircle from "../../../users/UserCircle";

const ChatMessage = ({message}) => {
    const currentUserId = window.current_user.id

    return (
        <div data-message-id={message.id} className={`d-flex align-items-start my-2 pe-2 chat-message ${currentUserId === message.user_id ? 'my' : ''}`}>
            <UserCircle className={'me-2'} user={message.user} size={30} withTooltip={true} />
            <div className="message-text">
                { message.text }
                <div className="message-time text-muted" title={message.created_at}>
                    { message.created_at_time }
                </div>
            </div>

        </div>
    );
};

export default ChatMessage;
