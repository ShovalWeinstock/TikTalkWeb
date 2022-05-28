import MessageBody from "./MessageBody";

function Message({ content, created, sent }) {

  var sentBy;
  if(sent == true) {
    sentBy = "sentByMe"
  }
  else {
    sentBy = "sentByOther"
  }

  return (
    <div className={(sentBy) + " " + "msg"}>
      <div className="msgBody">
        <MessageBody className="msgBody" content={content} type={"text"} />
      </div>
      <p className="small text-muted" >{created}</p>
    </div>
  )
}
export default Message;
