import MessageBody from "./MessageBody";

function Message({ type, content, currTime, sentBy }) {

  return (
    <div className={(sentBy) + " " + "msg"}>
      <div className="msgBody">
        <MessageBody className="msgBody" content={content} type={type} />
      </div>
      <p className="small text-muted" >{currTime}</p>
    </div>
  )
}
export default Message;
