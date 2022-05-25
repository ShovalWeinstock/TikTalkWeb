import { useState } from "react";

function AddContact({ refreshList, loggedInUserId, contactList }) {

  // username of the new contact
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [server, setServer] = useState('');

  // clear the input field
  const handleClick = (e) => {
    e.preventDefault();
    // Clear errors
    document.getElementById("addContactError").innerHTML = "";
    // Clear input
    setUsername("");
    setNickname("");
    setServer("");
  }


  const contactExists = function () {
    var contactExist = false;
    const contactsNum = contactList.length;
    var i;
    for (i = 0; i < contactsNum; i++) {
      if (contactList[i].id == username) {
        contactExist = true;
        break;
      }
    }
    return contactExist;
  }

  async function addToMe(){
    var str = "http://localhost:5051/api/contacts/?user=" + loggedInUserId;
    try {
        await fetch(str, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'id': username,
              'name': nickname,
              'server': server
            })
        });
     }
     catch (err) {
         console.error(err);
     }
}

async function addToOther(){
  var str = "http://" + server + "/api/invitations/";
  try {
      await fetch(str, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'from': loggedInUserId,
            'to': username,
            'server': "localhost:5051"
          })
      });
   }
   catch (err) {
       console.error(err);
       return false;
   }
   return true;
}


async function  addCont(){
    // when trying to add a chat with yourself
    if (username === loggedInUserId) {
      document.getElementById("addContactError").innerHTML = "Can't chat with yourself";
      return;
    }
    // if the contact aleady exists
    if (contactExists()) {
      document.getElementById("addContactError").innerHTML = "Contact Exists";
      return;
    }

    var success = await addToOther();
    if(success) {
      await addToMe();
      // resfresh the contacts list at the mainChat screen, so it will include the new contact
      await refreshList();
      window.$('#staticBackdrop').modal('hide')
    }
    else {
      document.getElementById("addContactError").innerHTML = "Error connecting to user";
    }
  }


  return (
    <span>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-primary" id="addContact" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
      </button>

      {/* Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Add New Contact</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>

              <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Username:</label>
                  <input type="text" className="form-control" id="recipient-name"
                    value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Nickname:</label>
                  <input type="text" className="form-control" id="recipient-name"
                    value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Server:</label>
                  <input type="text" className="form-control" id="recipient-name"
                    value={server} onChange={(e) => setServer(e.target.value)}></input>
                </div>

                <p id="addContactError" className="errorMessege"></p>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={addCont}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </span>
  )
}
export default AddContact;


