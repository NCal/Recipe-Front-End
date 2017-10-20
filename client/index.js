/* jshint ignore:start */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Styles
import './styles/style.scss';

// Comps
import Login from './components/Login';
import Layout from './components/layout';
import Recipes from './components/Recipes';

class App extends React.Component {
  render = () =>{
   return (
    <div>
      <div className="container">
         <BrowserRouter >
            <Layout >
              <Switch>
                <Route path="/" exact render={({props, history}) => <Login {...props} />}/>
                <Route path="/recipes" render={(props) => <Recipes {...props} history={history} />}/>
              </Switch>
            </Layout>
         </BrowserRouter>
      </div>
   </div>
   )}
}

ReactDOM.render(<App/>, document.getElementById("root"));
