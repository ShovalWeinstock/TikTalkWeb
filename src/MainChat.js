import './MainChat.css';
import AddContact from './mainChatLeft/AddContact';
import { useState } from 'react'
import ContactList from './mainChatLeft/ContactList';
import Search from './mainChatLeft/Search';
import TypingArea from './mainChatRight/TypingArea';
import messages from "./dataBase/Chats";
import MsgLoopCreator from './mainChatRight/MsgLoopCreator';

function MainChat(props) {

    // The chats of the loggedIn user
    const [messageList, setMessageList] = useState(messages.find(({ username }) => (props.user.username === username)).userChats);
    // The contacts of the loggedIn user
    const [contactList, setContactList] = useState(props.user.contacts);
    // The viewd contact
    const [currentContact, setCurrrentContact] = useState(null);
    // The chat with the viewd contact
    const [currentChat, setCurrrentChat] = useState([]);

    // search contact
    const doSearch = function (q) {
        setContactList((props.user.contacts).filter((contacts) => contacts.nickname.includes(q)))
    }

    // refresh the contacts list of the loggedIn user
    const refreshContactList = function (newContact) {        
        if ( (newContact != null) ) {
            (props.user.contacts).push(newContact);
        }
        setContactList(props.user.contacts);
    }

    async function refreshCurrentChat(contactId){
        var str = "http://localhost:5142/api/contacts/" + contactId + "/messages/?user=" + props.user.id;
        var messages;
        try {
            let res = await fetch(str);
             if(res.status == 200 ){ //todooooooooooooooooo and if not?
                 message = await res.json();
             }
         }
         catch (err) {
             console.error(err);
         }  
        setCurrrentChat(messages);
    }

    // refresh the viewd chat
    async function refreshCurrentContact(contact){
        setCurrrentContact(contact);
        await refreshCurrentChat(contact.id);   
    }

    

    // right side of the screen
    var rightSide = (!currentContact) ?
        <div className="rightSide" />
        :
        (
            <div className="rightSide">
                {/*viewd contact's details*/} 
                <div className='header'>
                    <div className='profilePicture'>
                        <img src={currentContact.picture} className="cover"></img>
                    </div>
                    <h6>{currentContact.nickname}</h6>
                </div>
                {/*Conversation*/}
                <div className='chat'>
                    <MsgLoopCreator msglis={currentChat} />
                </div>
                {/*Input area*/}
                <div className='chatInput'>
                    <TypingArea refreshChat={refreshCurrentChat} contactId={currentContact.id} refreshContactList={refreshContactList} />
                </div>
            </div>
        );

    return (
        <div className="container">

            <div className="leftSide">
                {/*loggedIn user's details*/}
                <div className='header'>
                    <div className='profilePicture'>
                        <img src={props.user.profilePic} className="cover"></img>
                    </div>
                    <h6>{props.user.nickname}</h6>
                    <AddContact refreshList={refreshContactList} refreshChatList={refreshMsgList} loggedInUser={props.user} />
                </div>

                {/*Search Chat*/}
                <Search doSearch={doSearch} />

                {/*Chats list*/}
                <div className="chatsList">
                    {/* the list of contacts gets the current state of contacts and messages */}
                    <ContactList contactlis={contactList} onContactClick={refreshCurrentContact} />
                </div>
            </div>

            {rightSide}

        </div>
    );
}

export default MainChat;
