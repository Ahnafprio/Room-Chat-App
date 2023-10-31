
import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chats from './Chats';

const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setusername] = useState("")
  const [room, setroom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(1);
    }
  };
  return (
    <div className="App">
      {!showChat ?
        (<div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" placeholder='prio..' on onChange={(event) => setusername(event.target.value)} />
          <input type="text" placeholder='roomid' on onChange={(event) => setroom(event.target.value)} />
          <button onClick={joinRoom}>join a room</button>
        </div>)
        :
        (
          <Chats socket={socket} username={username} room={room} />
        )}
    </div>

  );
}

export default App;
