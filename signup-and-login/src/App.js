import './App.css';
import './Userlist.js';
import Userlist from './Userlist.js';
import Signup from './Signup.js';
import Login from './Login.js';
import {Redirect, Route, Switch} from 'react-router-dom';
import {useState} from 'react';
import validator from 'validator'

function App() {

  const [user, setUser] = useState(
    {
      vorname:"",
      nachname:"",
      alter:"",
      email:"",
      passwort:"",
      _id:"",
    }
  )

  const [users, setUsers] = useState([
    {
      vorname:"",
      nachname:"",
      alter:"",
      email:"",
      passwort:"",
      _id:"",
  }]
  )

  const [updatedUser, setUpdatedUser] = useState({
    vorname:"",
    nachname:"",
    alter:"",
    email:"",
    passwort:"",
    _id:"",
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState("");

  function handleChangeAndValidatePassword(event){
    var password = event.target.value
    setUser(prevInput => {
      return{
        ...prevInput,
        passwort:password,
      };
    });
    console.log(user);
    if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    }) || validator.isEmpty(password)) {
      setPasswordError('')
    } else {
      setPasswordError('Passwort muss mind. 8 Zeichen, ein Sonderzeichen, eine Zahl und einen Großbuchstaben enthalten')
    }
  }

  function handleChangeAndValidateEmail(event){
    var e_mail = event.target.value
    setUser(prevInput => {
      return{
        ...prevInput,
        email:e_mail,
      };
    });
    console.log(user);
    if (validator.isEmail(e_mail) || validator.isEmpty(e_mail)) {
      setEmailError('');
    } else {
      setEmailError('Bitte eine korrekte E-Mailadresse einfügen!');
    }
  } 

  function handleUpdateAndValidatePassword(event){
    var password = event.target.value
    setUpdatedUser(prevInput => {
      return{
        ...prevInput,
        passwort:password,
      };
    });
    console.log(user);
    if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    }) || validator.isEmpty(password)) {
      setPasswordError('')
    } else {
      setPasswordError('Passwort muss mind. 8 Zeichen, ein Sonderzeichen, eine Zahl und einen Großbuchstaben enthalten')
    }
  }

  function handleUpdateAndValidateEmail(event){
    var e_mail = event.target.value
    setUpdatedUser(prevInput => {
      return{
        ...prevInput,
        email:e_mail,
      };
    });
    console.log(user);
    if (validator.isEmail(e_mail) || validator.isEmpty(e_mail)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!');
    }
  } 

  function handleChange(event){
    const {name,value} = event.target;
    setUser(prevInput => {
      return{
        ...prevInput,
        [name]:value,
      };
    });
    console.log(user);
  }

 
  function handleUpdate(event){
    const {name, value} = event.target; 
   setUpdatedUser(prevInput => {
     return(
       {
       ...prevInput,
       [name]:value,
       }
     )
   })
   console.log(updatedUser)
 }

  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
          <Redirect to="/login"/>
       </Route>
      <Route path="/login">
          <Login emailError={emailError} setEmailError={setEmailError} 
          passwordError = {passwordError} setPasswordError={setPasswordError}
          handleChangeAndValidatePassword={handleChangeAndValidatePassword}
          handleChangeAndValidateEmail={handleChangeAndValidateEmail}/>
       </Route> 
       <Route path="/users">
          <Userlist error={error}  setError={setError} emailError={emailError}  setEmailError={setEmailError} 
          passwordError={passwordError}  setPasswordError={setPasswordError} 
          user={user} setUser={setUser} users={users} setUsers={setUsers}
          handleUpdateAndValidatePassword={handleUpdateAndValidatePassword}
          handleUpdateAndValidateEmail={handleUpdateAndValidateEmail} handleUpdate={handleUpdate} 
          updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
        </Route> 
        <Route path="/signup">
          <Signup  error={error}  setError={setError} emailError={emailError}  setEmailError={setEmailError} 
          passwordError={passwordError}  setPasswordError={setPasswordError} 
          user={user} setUser={setUser} users={users} setUsers={setUsers} 
          handleChangeAndValidatePassword={handleChangeAndValidatePassword}
          handleChangeAndValidateEmail={handleChangeAndValidateEmail} handleChange={handleChange}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
