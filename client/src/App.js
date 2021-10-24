import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');
socket.on("joined_room", data => {
  console.log("returned data: " + data);
})

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = (event) => {
    console.log(room);

    event.preventDefault();
    console.log('joinRoom called!');
    if (name !== "" && room !== "") {
      socket.emit("joined_room", room);
    }
  }

  return (
    <div>
      <form className="App" onSubmit={joinRoom}>
        <input type='text' id="name" onChange={(event) => { setName(event.target.value) }}></input>
        <input type='text' id="room" onChange={(event) => { setRoom(event.target.value) }}></input>
        <button type="submit">Join A Room</button>
      </form>
      <Chat socket = {socket} username = {name} room ={room}/>
    </div>

  );
}

export default App;
