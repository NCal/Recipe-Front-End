import React from 'react';
import {Link} from 'react-router-dom';

const Nav = ({links}) => {
  return (
    <div>
       <ul className='nav'>
          {links.map(function(link, i){
            return <li key={i} className='header-link'> <Link to={link.url} key={i} >{link.name}</Link></li>
          })}
       </ul>
    </div>
  )
}

const Header = () => {
    const headerLinks = [{ name: 'Login', url: '/' }, { name: 'Recipes', url: '/recipes' }];
    return (
      <div className='header'>
        <Link to='/'>
          <img className='header-logo' src='../assets/logo.svg' alt='logo'/>
        </Link>
        <Nav links={headerLinks}/>
      </div>
    );
}

export default Header;
