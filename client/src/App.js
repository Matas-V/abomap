import React from 'react';
import { Switch, Route} from 'react-router-dom';
import './App.css';

import { Home, AdminPanel } from './components';


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/secretadminpanel" component={AdminPanel} />
      </Switch>
    </div>
  )
}

export default App;
