//import './Login.css';
import {Link} from 'react-router-dom';
import validator from 'validator'
import {useState} from 'react'

function Login({emailError, setEmailError, passwordError, setPasswordError}) {

    const [logUser, setLogUser] = useState({
      email:"",
      passwort:"",
    })

    function handleChangeAndValidateEmail(event){
      var e_mail = event.target.value
      setLogUser(prevInput => {
        return{
          ...prevInput,
          email:e_mail,
        };
      });
      console.log(logUser);
      if (validator.isEmail(e_mail) || validator.isEmpty(e_mail)) {
        setEmailError('');
      } else {
        setEmailError('Bitte eine korrekte E-Mailadresse einfügen!');
      }
    }

    function handleChangeAndValidatePassword(event){
      var password = event.target.value
      setLogUser(prevInput => {
        return{
          ...prevInput,
          passwort:password,
        };
      });
      console.log(logUser);
      if (validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      }) || validator.isEmpty(password)) {
        setPasswordError('')
      } else {
        setPasswordError('Passwort muss mind. 8 Zeichen, ein Sonderzeichen, eine Zahl und einen Großbuchstaben enthalten')
      }
    }
      
    return (
      <div>
      <form>
        <input onChange={e => handleChangeAndValidateEmail(e)} name="email" value={logUser.email} placeholder="E-Mail"></input>
        <span style={{fontWeight: 'bold', color: 'red'}}>{emailError}</span>
        <input onChange={(e) => handleChangeAndValidatePassword(e)} name="passwort" value={logUser.passwort} placeholder="Passwort"></input> 
        <span style={{fontWeight: 'bold', color: 'red'}}>{passwordError}</span>
      </form>
      <div>
           <button onClick={console.log("login")}>Login</button>
        <Link to='/signup'>Signup</Link>
      </div>
      </div>
    );
}

export default Login;