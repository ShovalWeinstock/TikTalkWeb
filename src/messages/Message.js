import MessageBody from "./MessageBody";

function Message({ content, created, sent }) {

  if(sent == "true") {
    sent = "sentByMe"
  }
  else {
    sent = "sentByOther"
  }

  return (
    <div className={(sent) + " " + "msg"}>
      <div className="msgBody">
        <MessageBody className="msgBody" content={content} type={"text"} />
      </div>
      <p className="small text-muted" >{created}</p>
    </div>
  )
}
export default Message;
