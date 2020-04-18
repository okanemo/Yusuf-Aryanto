import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Menu } from 'semantic-ui-react';

import { hasPermission } from '../helper';

function Dashboard() {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Menu.Item header as={Link} to="/dashboard">React App</Menu.Item>
        <Menu.Menu position="left">
          { hasPermission('read_permission') ? (<Menu.Item as={Link} to="/manage-users">Manage Users</Menu.Item>) : null }
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/logout">Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 800 }}>
          <Segment size="massive">DASHBOARD</Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Dashboard;
