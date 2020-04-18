import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu, Button, Table, Icon } from 'semantic-ui-react';

import CreateUserModal from '../components/CreateUserModal';
import UpdateUserModal from '../components/UpdateUserModal';
import DeleteUserModal from '../components/DeleteUserModal';

import { hasPermission } from '../helper';

function ManageUsers() {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);

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
      <Grid textAlign='center' style={{ height: '100vh' }}>
        <Grid.Column style={{ maxWidth: 800, paddingTop: '50px' }}>
          {
            hasPermission('create_permission')
            ?
            (
              <Button icon compact primary labelPosition='left' onClick={() => setOpenCreateUserModal(true)}>
                <Icon name='file' />
                Add User
              </Button>
            )
            : null
          }
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                {
                  hasPermission(['update_permission', 'delete_permission'], 'some')
                  ? (<Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>)
                  : null
                }
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>User</Table.Cell>
                <Table.Cell>user@email.com</Table.Cell>
                <Table.Cell>User</Table.Cell>
                {
                  hasPermission(['update_permission', 'delete_permission'], 'some')
                  ?
                  (
                    <Table.Cell textAlign="right">
                      <Button.Group>
                        {
                          hasPermission('update_permission')
                          ?
                          (
                            <Button color="yellow" icon="edit" compact onClick={() => setOpenUpdateUserModal(true)} />
                          )
                          : null
                        }
                        {
                          hasPermission('delete_permission')
                          ?
                          (
                            <Button color="red" icon="trash" compact onClick={() => setOpenDeleteUserModal(true)} />
                          )
                          : null
                        }
                      </Button.Group>
                    </Table.Cell>
                  )
                  : null
                }
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
      <CreateUserModal
        open={openCreateUserModal}
        onClose={() => setOpenCreateUserModal(false)} />
      <UpdateUserModal
        open={openUpdateUserModal}
        onClose={() => setOpenUpdateUserModal(false)} />
      <DeleteUserModal
        open={openDeleteUserModal}
        onClose={() => setOpenDeleteUserModal(false)}
        onNo={() => setOpenDeleteUserModal(false)} />
    </div>
  );
}

export default ManageUsers;
