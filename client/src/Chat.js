import  {useState,useEffect, useRef} from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket,username,room}) {
    const [newMessage, setNewMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    var textInput = useRef(null);

    const sendMessage = ()=>{
        // textInput.current.reset();
        console.log(textInput);
        if(newMessage !== ""){
            const currentMsg = {
                room : room,
                author: username,
                message: newMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() 
            }
            socket.emit("send_msg", currentMsg);
            setMessageList((list) => [...list, currentMsg]);
            setNewMessage("");
        }
        
    }    
    useEffect(()=>{
      let socketCall = async () =>{
      await socket.on("receive_msg", data=>{
            console.log(data);
            setMessageList((list) => [...list, data]);
        });
      }
      socketCall();
        return setNewMessage("");
    }, [socket]);
    return(
        // <div>
        //     <h3>Chat Start</h3>
        //     <input type="text" onChange={(event)=>{setNewMessage(event.target.value)}}></input>
        //     <button onClick={sendMessage}>chat</button>

        //     <label value = {newMessage}></label>
              
        // </div>
            <div className="chat-window">
              <div className="chat-header">
                <p>Live Chat</p>
              </div>
              <div className="chat-body">
                <ScrollToBottom className="message-container">
                  {messageList.map((messageContent) => {
                    return (
                      <div
                        className="message"
                        id={username === messageContent.author ? "you" : "other"}
                      >
                        <div className="">
                          <div className="message-content">
                            <p>{messageContent.message}</p>
                          </div>
                          <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ScrollToBottom>
              </div>
              <div className="chat-footer">
                <input
                  ref= {textInput}
                  id="typeMessage"
                  type="text"
                  value={newMessage}
                  placeholder="Hey..."
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                  }}
                  onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                  }}
                />
                <button onClick={sendMessage}>&#9658;</button>
              </div>
            </div>
    
    );
}
export default Chat;