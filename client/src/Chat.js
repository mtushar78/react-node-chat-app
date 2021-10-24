import  {useState,useEffect} from "react";

function Chat({socket,username,room}) {
    const [newMessage, setNewMessage] = useState("");
    const sendMessage = async ()=>{

        if(newMessage !== ""){
            const currentMsg = {
                room : room,
                author: username,
                message: newMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() 
            }
            await socket.emit("send_msg", currentMsg);
        }
        
    }    
    useEffect(()=>{
        socket.on("receive_msg", data=>{
            console.log(data);
            setNewMessage(data);
        });
    });
    return(
        <div>
            <h3>Chat Start</h3>
            <input type="text" onChange={(event)=>{setNewMessage(event.target.value)}}></input>
            <button onClick={sendMessage}>chat</button>

            <label value = {newMessage}></label>
              
        </div>
    );
}
export default Chat;