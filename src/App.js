import Registration from './register/Registration';
import Login from './login/Login';
import MainChat from './MainChat';
import { useState } from 'react';


function App() {
    
    const [isRegistered, setIsRegistered] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState(null);

    // in case of registering, it changes to "false", and than to "true" on successfull registration
    const changeRegState = () => {
        setIsRegistered(!isRegistered)
    }

    const changeLoggedInUser = (u) => {
        setLoggedInUser(u);
    }
    
    const Screen = () => {
        // if the user is not registered
        if(!isRegistered) {
            return <Registration changeRegState={changeRegState} changeLoggedInUser={changeLoggedInUser} />
        }
        // while no user logged in
        else if(loggedInUser == null) {
            return <Login changeRegState={changeRegState} changeLoggedInUser={changeLoggedInUser} />
        }
        // when logging in successfuly
        else {
            return <MainChat user={loggedInUser}/>
        }
    }

    return (
        <Screen></Screen>
    );
}
export default App;
