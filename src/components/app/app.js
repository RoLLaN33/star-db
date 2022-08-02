import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry/error-boundry';
import StarshipDetails from '../sw-components/starship-details';


import { 
  PeoplePage, 
  PlanetPage, 
  StarshipPage,
  LoginPage,
  SecretPage } from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context';

import './app.css';

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
      this.setState({
        isLoggedIn: true
      })
    };

    onServiceChange = () => {
      this.setState(({swapiService}) => {
        const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
          return {
            swapiService: new Service()
          };
      });
    };

    componentDidCatch() {
      this.setState({hasError: true});
    }

  render() {

    const { isLoggedIn } = this.state;

    return (
      <Router>
      <ErrorBoundry>
          <SwapiServiceProvider value={this.state.swapiService}>
              <div className='stardb-app'>
                <Header onServiceChange={this.onServiceChange}
                style={this.props.lol}/>
                <RandomPlanet updateInterval={10000}/>
                <Routes>
                  <Route path='/' 
                         render={() => (<h2>Welcome to StarDB</h2>)}
                         exact/>
                  <Route path='/people' element={<PeoplePage />} />
                  <Route path='/planets' element={<PlanetPage />} />          
                  <Route path='/starships' exact element={<StarshipPage />} />
                  <Route path='/starships/:id'
                         render={({match}) => {
                         const { id } = match.params;
                         return <StarshipDetails itemId={id} />
                        }} />
                  <Route path='/login' element={<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>}/>
                  <Route path='/secret' element={<SecretPage isLoggedIn={isLoggedIn}/> }/>
                </Routes>     
              </div>
          </SwapiServiceProvider>
      </ErrorBoundry>
      </Router>
    );
  }
}