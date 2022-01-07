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


    return (
        <div>
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


export default Userlist;
