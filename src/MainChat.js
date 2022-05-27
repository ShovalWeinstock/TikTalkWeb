import './MainChat.css';
import AddContact from './mainChatLeft/AddContact';
import { useState, useRef, useEffect } from 'react'
import ContactList from './mainChatLeft/ContactList';
import Search from './mainChatLeft/Search';
import TypingArea from './mainChatRight/TypingArea';
import MsgLoopCreator from './mainChatRight/MsgLoopCreator';
import defauldImg from './defaultImage.jpg';
import { HubConnectionBuilder } from '@microsoft/signalr';



function MainChat(props) {

    // The contacts of the loggedIn user
    const [contactList, setContactList] = useState(props.user.contacts);
    // The chat with the viewd contact
    const [currentChat, setCurrrentChat] = useState([]);
    // The connection to the server
    const [ connection, setConnection ] = useState(null);
    // The viewd contact
    var currContact = useRef(null);


    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5051/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);


    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => { 
                    connection.on('ReceiveMessage', (src, dst) => {
                        if(dst === props.user.id) {
                            refreshContactList(null);
                            refreshCurrentChat(src);
                        }                       
                    });
                    
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);


    // search contact
    const doSearch = function (q) {
        setContactList((props.user.contacts).filter((contacts) => contacts.name.includes(q)))
    }

    //refresh the contact list at the left bar
    async function  refreshContactList(){
        var str = "http://localhost:5051/api/contacts/?user=" + props.user.id;
        var contacts;
        try {
            let res = await fetch(str);
             if(res.status == 200 ){ //todooooooooooooooooo and if not?
                 contacts = await res.json();
             }
         }
         catch (err) {
             console.error(err);
         }  
        setContactList(contacts);
        props.user.contacts = contacts;
    }


    // function pushToCurrChat (message, sent) {
    //     var currChat = currentChat;
    //     var msg = { content: message.content, created: message.created, sent: sent }
    //     currChat.push(msg);
    //     setCurrrentChat(currChat);
    // }

    // refresh the currently viewd chat
    async function refreshCurrentChat(contactId){
        if(contactId == currContact.current.id) {
            var str = "http://localhost:5051/api/contacts/" + contactId + "/messages/?user=" + props.user.id;
            var messages;
            try {
                let res = await fetch(str);
                if(res.status == 200 ){ //todooooooooooooooooo and if not?
                    messages = await res.json();
                }
            }
            catch (err) {
                console.error(err);
            }  
            setCurrrentChat(messages);
         }
    }

    // refresh the current contact
    async function refreshCurrentContact(contact){
        currContact.current = contact;
        await refreshCurrentChat(contact.id);
    }


    // right side of the screen
    var rightSide = (!currContact.current) ?
        <div className="rightSide" />
        :
        (
            <div className="rightSide">
                {/*viewd contact's details*/} 
                <div className='header'>
                    <div className='profilePicture'>
                        <img src={defauldImg} className="cover"></img>
                    </div>
                    <h6>{currContact.current.name}</h6>
                </div>
                {/*Conversation*/}
                <div className='chat'>
                    <MsgLoopCreator msglis={currentChat} />
                </div>
                {/*Input area*/}
                <div className='chatInput'>
                    <TypingArea refreshChat={refreshCurrentChat} contactId={currContact.current.id} contactServer={currContact.current.server} 
                     user={props.user.id} refreshContactList={refreshContactList} connection={connection}/>
                </div>
            </div>
        );
        

    return (
        <div className="container">

            <div className="leftSide">
                {/*loggedIn user's details*/}
                <div className='header'>
                    <div className='profilePicture'>
                        <img src={defauldImg} className="cover"></img>
                    </div>
                    <h6>{props.user.name}</h6>
                    <AddContact refreshList={refreshContactList} contactList={contactList} loggedInUserId={props.user.id} />
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
