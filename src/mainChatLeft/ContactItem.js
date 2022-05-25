import defauldImg from '../defaultImage.jpg';

function ContactItem({id, name, last, lastdate, onclick }) {

    // The last message of the chat with the user. If it contains an attachement, show the type of the attachement (image/video/audio).

    async function  handleClick(){
        await onclick({picture: defauldImg, name: name, id: id});
    }

    //if the msg is too long show a shorten verion in the contact preview
    var msgShortnen = function(msg){
        if (msg.length > 20){
            msg = msg.slice(0,19) + " ...";
        }
        return msg;
    }

    return (
        <div className="contact" onClick={handleClick}>

            {/* profile picture */}
            <div className='profilePicture'>
                <img src={defauldImg} className="cover"></img>
            </div>

            <div className="contactDetails">
                <div className="contactItemHeader">
                    {/* nickname */}
                    <h6>{name}</h6>
                    {/* Time of the last message */}
                    <p className="time">{lastdate}</p>
                </div>

                <div className="lastMessage">
                    {/* The last msg in the chat */}
                    <p className="lastMessege">{msgShortnen(last)}</p> {/*todo shorten*/}
                </div>

            </div>
        </div>
    )
}
export default ContactItem;