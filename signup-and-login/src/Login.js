//import './Login.css';
import {Link} from 'react-router-dom';
import validator from 'validator'
import {useState} from 'react'

function Login({user, setUser, emailError, setEmailError}) {

    function handleChangeAndValidateEmail(event){
      var e_mail = event.target.value
      setUser(prevInput => {
        return{
          ...prevInput,
          email:e_mail,
        };
      });
      //console.log(user);
      if (validator.isEmail(e_mail) || validator.isEmpty(e_mail)) {
        setEmailError('');
      } else {
        setEmailError('Bitte eine korrekte E.Mailadresse einfügen!');
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
      
    return (
      <div>
      <form>
        <input onChange={e => handleChangeAndValidateEmail(e)} name="email" value={user.email} placeholder="E-Mail"></input>
        <span style={{fontWeight: 'bold', color: 'red'}}>{emailError}</span>
        <input onChange={(e) => handleChange(e)} name="passwort" value={user.passwort} placeholder="Passwort"></input> 
      </form>
      <div>
           <button onClick={console.log("login")}>Login</button>
        <Link to='/signup'>Signup</Link>
      </div>
      </div>
    );
}

export default Login;