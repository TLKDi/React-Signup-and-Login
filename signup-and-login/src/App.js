import './App.css';
import './Userlist.js';
import Userlist from './Userlist.js';
import Signup from './Signup.js';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Signup}/>
        <Route path="/users" component={Userlist}/>
      </Switch>
    </div>
  );
}

export default App;
