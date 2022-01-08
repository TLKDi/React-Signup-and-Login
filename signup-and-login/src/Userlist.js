import {useState, useEffect} from 'react';
import axios from 'axios';
//import './Userlist.css';

function Userlist({user, setUser, users, setUsers}) {
  
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    vorname:"",
    nachname:"",
    alter:null,
    email:"",
    passwort:"",
    _id:"",
  }

  );

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

  function updateUser(id){
    setOpenUpdate(true);
    setUpdatedUser(prevInput => {
      return {
        ...prevInput, 
        _id:id
      }
    });
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
          {!openUpdate ? 
            (users.map(user =>
              <div key={user._id}> 
                  <p>Vorname:  {user.vorname}</p>
                  <p>Nachname:{user.nachname}</p>
                  <p>Alter:{user.alter}</p>
                  <p>E-mail:{user.email}</p>
                  <p>Passwort:{user.passwort}</p>
                  <button onClick = {() => deleteUser(user._id)}>DELETE</button>
                  <button onClick = {() => updateUser(user._id)}>UPDATE</button>
              </div>
            ))
            :
            <div key={user._id}> 
                  <input onChange={handleChange} name="vorname" value={user.vorname} placeholder="Vorname"></input>
                  <input onChange={handleChange} name="nachname" value={user.nachname} placeholder="Nachname"></input>
                  <input onChange={handleChange} name="alter" value={user.alter} placeholder="Alter"></input>
                  <input onChange={handleChange} name="email" value={user.email} placeholder="E-Mail"></input>
                  <input onChange={handleChange} name="passwort" value={user.passwort} placeholder="Passwort"></input>
                  <button onClick = {() => updateUser(user._id)}>UPDATE USER</button>
            </div>
          }
        </div>
    );
}

export default Userlist;
