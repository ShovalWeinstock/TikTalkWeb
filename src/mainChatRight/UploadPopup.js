import { useState } from "react";
import "./UploadPopup.css";

function UploadPopup({ trigger, type, setTrigger, addMsg }) {

    // attachment to send
    const [attachment, setAttachment] = useState('');

    const uploadAttachment = (e) => {
        setAttachment(URL.createObjectURL(e.target.files[0]));
    }

    const sendAttachment = () => {
        // if no attachment was uploaded
        if (attachment == '') {
            document.getElementById("attachmentError").innerHTML = "Please add attachment";
        }
        // send the attachment
        else {
            addMsg(type, attachment);
            setTrigger(false);
        }
    }

    if (trigger) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Upload {type}</h5>
                                <button type="button" className="btn-close" onClick={() => { setTrigger(false) }}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {/*add attachment*/}
                                    <div className="mb-3">
                                        <input className="form-control" type="file" id="formFile" accept={(type) + "/*"} onChange={uploadAttachment} ></input>
                                        <p id="attachmentError" className="errorMessege"></p>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={sendAttachment}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return ("");
}
export default UploadPopup;
