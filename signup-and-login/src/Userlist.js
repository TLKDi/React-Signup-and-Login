import {useState, useEffect} from 'react';
import axios from 'axios';
//import Signup from './Signup.js';
//import './Userlist.css';

function Userlist({user, users, setUsers, updatedUser, setUpdatedUser, emailError, passwordError, 
  handleUpdateAndValidatePassword, error, setError, handleUpdateAndValidateEmail, handleUpdate}) {
  
  const [openUpdate, setOpenUpdate] = useState(false);

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

  function openUpdateForm(id){
    setOpenUpdate(true); 
    setUpdatedUser(prevInput => {
      return {
        ...prevInput, 
        _id:id
      }
    });
    }

    function updateUser(id){
      axios.put('/put/' + id, updatedUser).
      then(
      alert("User updated"),
      console.log(`User with id ${id} updated!`),
      //reloading page to get back to userlist
      window.location.reload(false)
      )
      .catch(errorMsg => setError(errorMsg))
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
                  <button onClick = {() => openUpdateForm(user._id)}>UPDATE</button>
              </div>
            ))
            :
            <div key={user._id}> 
                  <input onChange={handleUpdate} name="vorname" value={updatedUser.vorname} placeholder="Vorname"></input>
                  <input onChange={handleUpdate} name="nachname" value={updatedUser.nachname} placeholder="Nachname"></input>
                  <input onChange={handleUpdate} name="alter" value={updatedUser.alter} placeholder="Alter"></input>
                  <input onChange={(e) => handleUpdateAndValidateEmail(e)} name="email" value={updatedUser.email} placeholder="E-Mail"></input>
                  <span style={{fontWeight: 'bold', color: 'red'}}>{emailError}</span>
                  <input onChange={(e) => handleUpdateAndValidatePassword(e)} name="passwort" value={updatedUser.passwort} placeholder="Passwort"></input>
                  <span style={{fontWeight: 'bold', color: 'red'}}>{passwordError}</span>
                  <button onClick = {() => updateUser(updatedUser._id)}>UPDATE USER</button>
                  <h1>{error}</h1>
            </div>
          }
        
        </div>
    );
}

export default Userlist;
