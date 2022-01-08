import axios from 'axios';
//import './Login.css';
import {Link} from 'react-router-dom';

function Home({user, setUser}) {

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
        <input onChange={handleChange} name="email" value={user.email} placeholder="E-Mail"></input>
        <input onChange={handleChange} name="passwort" value={user.passwort} placeholder="Passwort"></input>
        <button onClick={console.log("login")}>Login</button>
        <Link to='/signup'>Signup</Link>
      </div>
    );
}

export default Home;