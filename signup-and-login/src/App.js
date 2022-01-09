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

  const [redirect, setRedirect] = useState(false);

  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
          <Login user={user} setUser={setUser} users={users} setUsers={setUsers}/>
       </Route> 
       <Route path="/users">
          <Userlist redirect={redirect} setRedirect={setRedirect} user={user} setUser={setUser} users={users} setUsers={setUsers}/>
        </Route> 
        <Route path="/signup">
          <Signup redirect={redirect} setRedirect={setRedirect} user={user} setUser={setUser} users={users} setUsers={setUsers}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
