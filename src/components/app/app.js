import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry/error-boundry';


import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context';

import './app.css';

export default class App extends Component {

    state = {
        swapiService: new SwapiService()
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

    return (
      <Router>
      <ErrorBoundry>
          <SwapiServiceProvider value={this.state.swapiService}>
          <div className='stardb-app'>
            <Header onServiceChange={this.onServiceChange}
            style={this.props.lol}/>
          
          <RandomPlanet updateInterval={10000}/>

            <Routes>
              <Route path='/characters' element={<PeoplePage />} />
              <Route path='/planets' element={<PlanetPage />} />          
              <Route path='/starships' element={<StarshipPage />} />  
            </Routes>     

          </div>
          </SwapiServiceProvider>
      </ErrorBoundry>
      </Router>
    );
  }
}