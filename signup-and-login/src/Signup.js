import axios from 'axios';
import validator from 'validator'
import './Signup.css';

function Signup({user, setUser, emailError, setEmailError, passwordError, setPasswordError, openAdd, setOpenAdd}) {
      
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

      function handleChangeAndValidatePassword(event){
        var password = event.target.value
        setUser(prevInput => {
          return{
            ...prevInput,
            passwort:password,
          };
        });
        if (validator.isStrongPassword(password, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        }) || validator.isEmpty(password)) {
          setPasswordError('')
        } else {
          setPasswordError('Passwort muss mind. 8 Zeichen, ein Sonderzeichen, eine Zahl und einen Großbuchstaben enthalten')
        }
      }
      
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
        axios.post('/newUser',newUser);
        setUser(
          {
            vorname : "",
            nachname : "",
            alter : "",
            email : "",
            passwort : "",
          }
        );
        setOpenAdd(!openAdd);
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
          <button onClick={addUser}>ADD USER</button>
        </div>
      );
}

export default Signup;
