import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

import './item-details.css';
import ErrorButton from '../error-button/error-button';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    this.setState({
        item,
        loading: false,
        error: false,
        
    });
};

  onError = (err) => {
    this.setState({
        error: true,
        loading: false
    });
  };

  getImageUrl = (image) => {
    this.setState({
      image,
      item: image
    })
  }

  updateItem = () => {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then(this.getImageUrl)
      .then(this.onItemLoaded)
      .catch(this.onError);
  };

  render() {

    if (!this.state.item) {
      return <span>Select a person from a list</span>
    }

    const { item, loading, error } = this.state;

    const hasData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemView item={item} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;


    return (
      <div>
        { errorMessage }
        { spinner }
        { content }
      </div>    
    )
  }
}

const ItemView = ({ item }) => {

  const { image, name, gender, birthYear, eyeColor } = item;

  return (
    <div className="person-details card">
      <img className="person-image"
        src={image} alt='character'/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton/>
      </div>
    </div>
  )
}
