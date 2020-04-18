import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function Home() {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Menu.Item header>React App</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login">Login</Menu.Item>
          <Menu.Item as={Link} to="/register">Register</Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Home;
