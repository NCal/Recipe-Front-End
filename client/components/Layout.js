import React from 'react';
import Nav from './header.js';
import Header from './header.js';

const Layout = (props) => 
  <div>
    <Header/>
    <div className='modal-bg'></div>
    <div className='body-container'>
      {props.children}
    </div>
  </div>;

export default Layout;