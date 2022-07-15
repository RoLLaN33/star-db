import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

const Header = (onServiceChange) => {

  const style = ({isActive}) => ({
    color: isActive ? 'white' : ''
  })

  return (
    <div className="header d-flex">
      <h3>
        <NavLink to='/'>
          Star DB
        </NavLink>
      </h3>
      <ul className="d-flex">
        <li>
          <NavLink 
            to='/characters'
            style={style}>
            People
          </NavLink>
        </li>
        <li>
          <NavLink 
            to='/planets'
            style={style}>
            Planets
          </NavLink>
        </li>
        <li>
          <NavLink 
            to='/starships'
            style={style}>
            Starships
          </NavLink>
        </li>
      </ul>
      <button 
            onClick={onServiceChange}
            className='btn btn-primary btn-sm'>
          Change Service
      </button>
    </div>
  );
}

export default Header;