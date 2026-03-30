import { useState } from "react";
import { Chat } from "./Chat";
import UserList from "./UserList";



const Home = ({ setPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isUserListOpen, setIsUserListOpen] = useState(false);

    const [receiverId, setReceiverId] = useState(null);
    const [receiverName, setReceiverName] = useState("");

    const fullName = localStorage.getItem("fullName");

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("fullName");
        localStorage.removeItem("page");

        setPage("login")
    }

    // const goToSettings = () => {
    //     setPage("settings");
    //     setIsMenuOpen(false);
    // };

    const handleChat = async () => {
        setIsChatOpen(!isChatOpen);
        setIsUserListOpen(!isUserListOpen);
        setIsMenuOpen(false);
    }

    return (
        <div className="home-container">
            <div className="menu-wrapper">
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        {/* <button className="menu-item">
                            <span className="icon">⚙</span> Settings
                        </button> */}
                        <button className="menu-item" onClick={handleChat}>
                            <span className="icon" >💬</span> Chat
                        </button>
                        <button onClick={handleLogout} className="menu-item">
                            <span className="icon">⏻️</span> Log out
                        </button>
                    </div>
                )}

                {/* Menu Button */}
                <button
                    className={`menu-trigger ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                >
                    <div className="hamburger-lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>MENU</p>
                </button>
            </div>

            {!isChatOpen && <div className="home-page">
                <p className="home-page-greet-user">Hi, {fullName}</p>
            </div>}

            {isChatOpen && receiverId && (
                <Chat
                    receiverId={receiverId}
                    receiverName={receiverName}
                />
            )}

            {isUserListOpen && (
                <UserList
                    setReceiverName={setReceiverName}
                    setReceiverId={setReceiverId}
                    currentReceiverName={receiverName}
                />
            )}
        </div>

    )
}

export default Home