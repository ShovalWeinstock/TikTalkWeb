function ContactItem({ picture, nickname, onclick, lastChat }) {

    // The last message of the chat with the user. If it contains an attachement, show the type of the attachement (image/video/audio).
    var message = (lastChat.type == "text"? lastChat.content : lastChat.type);

    const handleClick = function () {
        onclick({picture: picture, nickname: nickname});
    }

    //if the msg is too long show a shorten verion in the contact preview
    var msgShortnen = function(msg){
        if (message.length > 20){
            msg = msg.slice(0,19) + " ...";
        }
        return msg;
    }

    return (
        <div className="contact" onClick={handleClick}>

            {/* profile picture */}
            <div className='profilePicture'>
                <img src={picture} className="cover"></img>
            </div>

            <div className="contactDetails">
                <div className="contactItemHeader">
                    {/* nickname */}
                    <h6>{nickname}</h6>
                    {/* Time of the last message */}
                    <p className="time">{lastChat.currTime}</p>
                </div>

                <div className="lastMessage">
                    {/* The last msg in the chat */}
                    <p className="lastMessege">{msgShortnen(message)}</p>
                </div>

            </div>
        </div>
    )
}
export default ContactItem;