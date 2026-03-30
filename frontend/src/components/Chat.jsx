import React, { useState, useEffect, useRef } from 'react';
import { getChatsApi, sendMessageApi } from "../services/api";

export const Chat = ({ receiverId, receiverName }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const scrollRef = useRef(null);

    // const currentUserId = parseInt(localStorage.getItem("userId"));

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await getChatsApi(receiverId);
                setMessages(data);
            }


            catch (err) {
                console.error("Failed to load history:", err.message);
            }
        };

        if (receiverId) {
            loadMessages();

            const intervalId = setInterval(() => {
                loadMessages();
            }, 1000);

            return () => clearInterval(intervalId);
        }

    }, [receiverId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        try {
            const savedMsg = await sendMessageApi(receiverId, inputText);
            setMessages([...messages, savedMsg]);
            setInputText('');
        } catch (err) {
            alert("Could not send message: " + err.message);
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>{receiverName}</h3>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => {
                    // Force both to numbers to guarantee a match
                    const myId = localStorage.getItem("userId");
                    const isMe = String(msg.senderId) === String(myId);

                    return (
                        <div
                            key={msg.id}
                            className={`message-wrapper ${isMe ? 'sender' : 'receiver'}`}
                        >
                            <div className="message-bubble">
                                {msg.content}
                            </div>
                        </div>
                    );
                })}
                {/* Invisible element to anchor the scroll */}
                <div ref={scrollRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" disabled={!inputText.trim()}>Send</button>
            </form>
        </div>
    );
};



