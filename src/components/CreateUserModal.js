import React from 'react';
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react';

function CreateUserModal({ open, onOpen, onClose }) {
  return (
    <Modal
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      size='small'
    >
      <Modal.Header>Add New User</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input type="text" />
          </Form.Field>
          <Form.Field>
            <label>E-mail</label>
            <input type="text" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input type="password" />
          </Form.Field>
          <Form.Field>
            <label>Role</label>
            <Dropdown
              placeholder='Select Role'
              fluid
              selection
              options={[
                {
                  key: '1',
                  text: 'Admin',
                  value: '1',
                },
                {
                  key: '2',
                  text: 'User',
                  value: '2',
                }
              ]}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary icon='check' content='Save' onClick={onClose} />
      </Modal.Actions>
    </Modal>
  );
}

export default CreateUserModal;
