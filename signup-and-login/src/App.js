import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

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

  useEffect(() => {
    fetch('/users').then((res) => {
      if (res.ok){
        return res.json();
      }
    })
    .then(jsonRes => setUsers(jsonRes))
    .catch((err) => console.log(err))
  }, [users]);
  

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
    <div className="App">
      <input onChange={handleChange} name="vorname" value={user.vorname} placeholder="Vorname"></input>
      <input onChange={handleChange} name="nachname" value={user.nachname} placeholder="Nachname"></input>
      <input onChange={handleChange} name="alter" value={user.alter} placeholder="Alter"></input>
      <input onChange={handleChange} name="email" value={user.email} placeholder="E-Mail"></input>
      <input onChange={handleChange} name="passwort" value={user.passwort} placeholder="Passwort"></input>
      <button onClick={addUser}>ADD USER</button>      
      {users.map(user =>
      <div key={user._id}> 
        <p>Vorname:  {user.vorname}</p>
        <p>Nachname:{user.nachname}</p>
        <p>Alter:{user.alter}</p>
        <p>E-mail:{user.email}</p>
        <p>Passwort:{user.passwort}</p>
        </div>
      )}
    </div>
  );
}

export default App;
