import ContactItem from "./ContactItem";

function ContactList({ contactlis, onContactClick }) {
    const contactList = contactlis.map((cont, key) => {        
        // extract the last msg in the chat for the preview info
        return <ContactItem {...cont} key={key} onclick={onContactClick} lastChat={cont.last}/>
    });
    return (
        <div className="list-group rounded-0">
        {contactList}
      </div>
    )
}
export default ContactList;