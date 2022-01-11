import {useState, useEffect} from 'react';
import axios from 'axios';
import Signup from './Signup.js';
//import './Userlist.css';

function Userlist({user,setUser, users, setUsers, emailError, passwordError, openAdd, setOpenAdd}) {
  
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    vorname:"",
    nachname:"",
    alter:"",
    email:"",
    passwort:"",
    _id:"",
  });

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
      axios.put('/put/' + id, updatedUser);
      alert("User updated");
      console.log(`User with id ${id} updated!`);
      //reloading page to get back to userlist
      window.location.reload(false);
    }

    function handleUpdate(event){
       const {name, value} = event.target; 
      setUpdatedUser(prevInput => {
        return(
          {
          ...prevInput,
          [name]:value,
          }
        )
      })
      console.log(updatedUser)
    }

    function signupToggle(){
      setOpenAdd(!openAdd);
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
                  <input onChange={handleUpdate} name="email" value={updatedUser.email} placeholder="E-Mail"></input>
                  <input onChange={handleUpdate} name="passwort" value={updatedUser.passwort} placeholder="Passwort"></input>
                  <button onClick = {() => updateUser(updatedUser._id)}>UPDATE USER</button>
            </div>
          }
          <br/>
          <div>
            {openAdd ?
            
                <Signup  emailError={emailError}   
                passwordError={passwordError}  
                user={user} setUser={setUser}
                users={users} setUsers={setUsers}>
                </Signup>
              :
            <button onClick={signupToggle()}>NEW USER</button>
            }
          </div>
        </div>
    );
}

export default Userlist;
