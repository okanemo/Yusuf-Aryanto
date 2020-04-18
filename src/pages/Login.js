import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Grid, Segment, Menu, Form, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'qs';

const { REACT_APP_API_HOST } = process.env;

function Login() {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    // TODO: CHECK AUTHENTICATION
  }, []);

  const handlePostLogin = async (data) => {
    await axios.post(`${REACT_APP_API_HOST}/auth/login`, qs.stringify(data)).then(({ data }) => {
      if(data && data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        history.push('/dashboard');
      }
    });
  };

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
          <Form size='large' onSubmit={handleSubmit(handlePostLogin)}>
            <Segment stacked>
              <Form.Field>
                <input
                  placeholder='E-mail address'
                  name="email"
                  ref={register({ required: true })} />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder='Password'
                  name="password"
                  type="password"
                  ref={register({ required: true })} />
              </Form.Field>

              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Login;
