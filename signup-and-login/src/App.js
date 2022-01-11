import './App.css';
import './Userlist.js';
import Userlist from './Userlist.js';
import Signup from './Signup.js';
import Login from './Login.js';
import {Route, Switch} from 'react-router-dom';
import {useState} from 'react';

function App() {

  const [user, setUser] = useState(
    {
      vorname:"",
      nachname:"",
      alter:null,
      email:"",
      passwort:"",
      _id:"",
    }
  )

  const [users, setUsers] = useState([
    {
      vorname:"",
      nachname:"",
      alter:null,
      email:"",
      passwort:"",
      _id:"",
  }]
  )

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
          <Login user={user} setUser={setUser} users={users} setUsers={setUsers}/>
       </Route> 
       <Route path="/users">
          <Userlist emailError={emailError}  setEmailError={setEmailError} 
          passwordError={passwordError}  setPasswordError={setPasswordError} 
          user={user} setUser={setUser} users={users} setUsers={setUsers}
          openAdd={openAdd} setOpenAdd={setOpenAdd}/>
        </Route> 
        <Route path="/signup">
          <Signup  emailError={emailError}  setEmailError={setEmailError} 
          passwordError={passwordError}  setPasswordError={setPasswordError} 
          user={user} setUser={setUser} users={users} setUsers={setUsers} 
          openAdd={openAdd} setOpenAdd={setOpenAdd}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
