import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Landing from './components/landing/landing.jsx';
import Home from './components/home/home';
import Nav from './components/nav/nav';
import Detail from './components/detail/detail';
import { ActivitiesCreate } from './components/activitiesCreate/activitiesCreate';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <Switch>
        <Route path="/create" component={ActivitiesCreate}/>
        <Route exact path="/" component={Landing}/>
        <Route path="/home" component={Home}/>
        <Route path="/create" component={ActivitiesCreate}/>
        <Route path='/countries/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
