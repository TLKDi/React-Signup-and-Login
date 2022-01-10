import axios from 'axios';
//import './Login.css';
import {Link} from 'react-router-dom';
import validator from 'validator'
import {useState} from 'react'

function Login({user, setUser}) {

  const [emailError, setEmailError] = useState('')

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
        setEmailError('Enter valid Email!');
      }
    }
  
    return (
      <div>
        <input onChange={e => handleChangeAndValidateEmail(e)} name="email" value={user.email} placeholder="E-Mail"></input>
        <span style={{fontWeight: 'bold', color: 'red'}}>{emailError}</span>
        <input onChange={handleChange} name="passwort" value={user.passwort} placeholder="Passwort"></input>
        <button onClick={console.log("login")}>Login</button>
        <Link to='/signup'>Signup</Link>
      </div>
    );
}

export default Login;