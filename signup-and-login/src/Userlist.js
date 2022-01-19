import {useState, useEffect} from 'react';
import axios from 'axios';
//import Signup from './Signup.js';
//import './Userlist.css';

function Userlist({user, users,setUser, setUsers, updatedUser, setUpdatedUser, emailError, passwordError, 
   error, setError, handleUpdateAndValidateEmail, handleUpdateAndValidatePassword, 
   handleChangeAndValidateEmail, handleChangeAndValidatePassword, handleChange, handleUpdate}) {
  
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
        axios.post('/newUser',newUser)
        .then(
          setUser(
            {
              vorname : "",
              nachname : "",
              alter : "",
              email : "",
              passwort : "",
            }
          )
        ).catch(errorMsg => setError(errorMsg));
    }

    return (
        <div>
          {!openUpdate ? 
          (<div>
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
          <h1>{error}</h1>
          </div>)
          :
          ""
          }
          {!openUpdate ? 
            (
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
            
            )
            :
            <div key={user._id}> 
                <form>
                  <input onChange={(e) =>handleUpdate(e)} name="vorname" value={updatedUser.vorname} placeholder="Vorname"></input>
                  <input onChange={(e) =>handleUpdate(e)} name="nachname" value={updatedUser.nachname} placeholder="Nachname"></input>
                  <input onChange={(e) =>handleUpdate(e)} name="alter" value={updatedUser.alter} placeholder="Alter"></input>
                  <input onChange={(e) => handleUpdateAndValidateEmail(e)} name="email" value={updatedUser.email} placeholder="E-Mail"></input>
                  <span style={{fontWeight: 'bold', color: 'red'}}>{emailError}</span>
                  <input onChange={(e) => handleUpdateAndValidatePassword(e)} name="passwort" value={updatedUser.passwort} placeholder="Passwort"></input>
                  <span style={{fontWeight: 'bold', color: 'red'}}>{passwordError}</span>
                </form>
                  <button onClick = {() => updateUser(updatedUser._id)}>UPDATE USER</button>
                  <h1>{error}</h1>
            </div>
          }
        
        </div>
    );
}

export default Userlist;
