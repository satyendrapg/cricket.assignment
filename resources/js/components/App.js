import React from 'react';
import { useHistory, BrowserRouter, Route, Switch } from 'react-router-dom'
import PrimaryHeader from './header';
import Teams from './Team/teams';
import Team from './Team/team';
import PlayerAdd from './Player/Add';
import PlayerEdit from './Player/Edit';
import TeamAdd from './Team/Add';
import TeamEdit from './Team/Edit';
import Matches from './Matches/matches';
import Points from './Matches/points';

function App() {
  return (
    <BrowserRouter histoty={useHistory}>
    <div className="container Container-fluid">
      <header>
        <PrimaryHeader/>
      </header>

        <switch>
          <Route exact path="/" component={Teams}/>
          <Route exact path="/detail/:id" component={Team}/>
          <Route exact path="/player/edit/:id" component={PlayerEdit}/>
          <Route exact path="/player/add" component={PlayerAdd}/>
          <Route exact path="/team/edit/:id" component={TeamEdit} />
          <Route exact path="/team/add" component={TeamAdd}/>
          <Route exact path="/matches" component={Matches}/>
          <Route exact path="/points" component={Points}/>
        </switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
