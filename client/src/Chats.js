import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chats({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),
            };

            if (socket) {
                await socket.emit('send_message', messageData);
                setMessageList((prevMessageList) => [...prevMessageList, messageData]);
                setCurrentMessage("")
            }
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('receive_message', (data) => {
                setMessageList((prevMessageList) => [...prevMessageList, data]);
            });
        }
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => (
                        <div className="message" key={messageContent.id}>
                            <div>
                                <div className="message-content" id={username === messageContent.author ? "you" : "other"}>
                                    <p id="time">{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p>{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey.."
                    onChange={(event) => setCurrentMessage(event.target.value)}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chats;
