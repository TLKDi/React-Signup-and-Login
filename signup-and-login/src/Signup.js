import axios from 'axios';
//import validator from 'validator'
//import {useState} from 'react'
import './Signup.css';

function Signup({user, setUser, emailError, passwordError, 
  handleChangeAndValidatePassword, error, setError, handleChangeAndValidateEmail, handleChange}) {   

      function addUser(event){
        event.preventDefault();
        const newUser = {
          vorname : user.vorname,
          nachname : user.nachname,
          alter : user.alter,
          email : user.email,
          passwort : user.passwort,
        }
        console.log(newUser);
          axios.post('/newUser',newUser)
          .then(
            setUser(
              {
                vorname : "",
                nachname : "",
                alter : "",
                email : "",
                passwort : "",
              }
            )
          ).catch(errorMsg => setError(errorMsg));
      }
          
      return (
        <div>
          <form>
            <input onChange={e => handleChange(e)} name="vorname" value={user.vorname} placeholder="Vorname" ></input>
            <input onChange={e => handleChange(e)} name="nachname" value={user.nachname} placeholder="Nachname"></input>
            <input onChange={e => handleChange(e)} name="alter" value={user.alter} placeholder="Alter"></input>
            <input onChange={(e) => handleChangeAndValidateEmail(e)} name="email" value={user.email} placeholder="E-Mail" ></input>
            <span style={{fontWeight: 'bold', color: 'red'}}>{emailError}</span>
            <input onChange={(e) => handleChangeAndValidatePassword(e)} name="passwort" value={user.passwort} placeholder="Passwort"></input> 
            <span style={{fontWeight: 'bold', color: 'red'}}>{passwordError}</span>
          </form>
          <button onClick={addUser}>SIGNUP</button>
          <h1>{error}</h1>
        </div>
      );
}

export default Signup;
