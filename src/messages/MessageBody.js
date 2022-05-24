
function MessageBody({ content, type }) {
    // image message
    if (type == "image") {
        return (
            <img id="imgMsg" src={content} className="img"></img>);
    }
    // video message
    else if (type == "video") {
        return (
            <video width="320" height="240" controls>
                <source src={content} />
            </video>
        )
    }
    // audio message
    else if (type == "audio") {
        return (
        <audio controls>
            <source src={content} type='video/webm' />
        </audio>
        )
    }
    // text message
    return (<p>{content}</p>);
}
export default MessageBody;