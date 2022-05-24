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


    // refresh the chats of the loggesIn user
    const refreshMsgList = function () {
        setMessageList([...messages.find(({ username }) => (props.user.username === username)).userChats]);
    }

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

    // refresh the viewd chat
    const refreshCurrentChat = function (contact) {
        setCurrrentContact(contact);
        setCurrrentChat(messageList.find(({ nickname }) => (contact.nickname === nickname)).chats);
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
                    <TypingArea refreshChat={refreshMsgList} currChat={currentChat} refreshContactList={refreshContactList} />
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
                    <ContactList contactlis={contactList} onContactClick={refreshCurrentChat} updatedMsg={messageList} />
                </div>
            </div>

            {rightSide}

        </div>
    );
}

export default MainChat;
