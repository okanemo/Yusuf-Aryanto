import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Menu, Form, Button } from 'semantic-ui-react';

function Register() {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Menu.Item header>React App</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login">Login</Menu.Item>
          <Menu.Item as={Link} to="/register">Register</Menu.Item>
        </Menu.Menu>
      </Menu>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' />
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
              />

              <Button color='teal' fluid size='large'>
                Register
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Register;
