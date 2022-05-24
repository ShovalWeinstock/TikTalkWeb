import ContactItem from "./ContactItem";

function ContactList({ contactlis, onContactClick, updatedMsg }) {
    const contactList = contactlis.map((cont, key) => {
        //extract the chats of the current contact
        var updatedChats = updatedMsg.find(({ nickname }) => (cont.nickname === nickname)).chats;
        // extract the last msg in the chat for the preview info
        var lastChat = updatedChats[updatedChats.length -1];
        return <ContactItem {...cont} key={key} onclick={onContactClick} lastChat={lastChat}/>
    });
    return (
        <div className="list-group rounded-0">
        {contactList}
      </div>
    )
}
export default ContactList;