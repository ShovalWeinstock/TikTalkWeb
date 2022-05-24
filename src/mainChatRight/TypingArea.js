import { useState } from "react";
import UploadPopup from "./UploadPopup";
import RecordPopup from "./RecoredPopup"

// bottom bar in the chat section. refreshChat arg will reload the chat
function TypingArea({ refreshChat, currChat, refreshContactList }) {

    // the message typed in the input bar
    const [currentMsg, setCurrentMsg] = useState('');
    // state of the popups (hidden - false, or shown - true)
    const [uploadImgPopup, setUploadImgPopup] = useState(false);
    const [uploadVidPopup, setUploadVidPopup] = useState(false);
    const [recordPopup, setRecordPopup] = useState(false);

    // Add a new message
    const addMsg = (type, content) => {
        if (content != "") {
            var currTime = new Date();
            var date = currTime.getFullYear() + '-' + (currTime.getMonth() + 1) + '-' + currTime.getDate();
            var time = currTime.getHours() + ":" + currTime.getMinutes();
            var newMgs = { type: type, sentBy: "sentByMe", content: content, currTime: date + ' | ' + time };
            currChat.push(newMgs);
            // reload the message in the chat again
            refreshChat();
            // refresh the contacts list for the left side of the mainChat screen. (null=no new contact)
            refreshContactList(null);
            setCurrentMsg("");
        }
    }

    return (
        <div className="input-group">

            <UploadPopup trigger={uploadImgPopup} setTrigger={setUploadImgPopup} type="image" addMsg={addMsg} />
            <UploadPopup trigger={uploadVidPopup} setTrigger={setUploadVidPopup} type="video" addMsg={addMsg} />
            <RecordPopup trigger={recordPopup} setTrigger={setRecordPopup} type="audio" addMsg={addMsg} />

            {/*Message typing area*/}
            <input id="chatTypingArea" value={currentMsg} onChange={(e) => setCurrentMsg(e.target.value, currentMsg)}
                type="text" className="form-control" aria-label="Text input with segmented dropdown button"></input>

            {/*"Send" button*/}
            <button type="button" className="btn btn-outline-secondary" id="sendMsgBtn" onClick={() => { addMsg("text", currentMsg) }}>Send</button>

            {/*dropup*/}
            <div className="btn-group dropup">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="chatDropup">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                    {/*Send image*/}
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setUploadImgPopup(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                            </svg>
                            Image
                        </a>
                    </li>
                    {/*Send video*/}
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setUploadVidPopup(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
                            </svg>
                            Video
                        </a>
                    </li>
                    {/*Send audio*/}
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setRecordPopup(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                            </svg>
                            Audio
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default TypingArea;