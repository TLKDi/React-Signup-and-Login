import {useState, useEffect} from 'react';
import axios from 'axios';
//import './Userlist.css';

function Userlist() {
 
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

  function deleteUser(id){
    axios.delete("/delete/" + id);
    alert('User deleted!');
    console.log(`User with id ${id} deleted.`);
  }

    return (
        <div>
            {users.map(user =>
            <div key={user._id}> 
                <p>Vorname:  {user.vorname}</p>
                <p>Nachname:{user.nachname}</p>
                <p>Alter:{user.alter}</p>
                <p>E-mail:{user.email}</p>
                <p>Passwort:{user.passwort}</p>
                <button onClick = {() => deleteUser(user._id)}>DELETE</button>
                <button>UPDATE</button>
            </div>
            )}
        </div>
    );
}


export default Userlist;
