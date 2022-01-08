import axios from 'axios';
//import './Signup.css';

function Signup({user, setUser, users, setUsers}) {

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
      }
    
      return (
        <div>
          <input onChange={handleChange} name="vorname" value={user.vorname} placeholder="Vorname"></input>
          <input onChange={handleChange} name="nachname" value={user.nachname} placeholder="Nachname"></input>
          <input onChange={handleChange} name="alter" value={user.alter} placeholder="Alter"></input>
          <input onChange={handleChange} name="email" value={user.email} placeholder="E-Mail"></input>
          <input onChange={handleChange} name="passwort" value={user.passwort} placeholder="Passwort"></input>
          <button onClick={addUser}>ADD USER</button>
        </div>
      );
}

export default Signup;
