import { useState } from "react";
import { Switch, Route} from "react-router-dom";
import { users } from "./data";
import AddUsers from './pages/AddUsers'
import EditUsers from './pages/EditUsers'
import ListUsers from './pages/ListUsers';

function App() {
  const [usersData, setUsersData] = useState(users);
  return (
   <div className='container'>
     <Switch>
        <Route exact path="/">
          <ListUsers usersData={usersData} setUsersData={setUsersData}/>
          </Route>
        <Route exact path="/add">
          <AddUsers/>
          </Route>
        <Route  path="/edit/:id">
          <EditUsers usersData={usersData} setUsersData={setUsersData}/>
          </Route>
      </Switch>
   </div>
  );
}

export default App;
