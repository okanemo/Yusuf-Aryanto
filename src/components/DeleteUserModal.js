import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

function DeleteUserModal({ open, onOpen, onClose, onYes, onNo }) {
  return (
    <Modal
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      size='mini'
    >
      <Modal.Header>Delete User</Modal.Header>
      <Modal.Content>Are you sure you want to delete this user?</Modal.Content>
      <Modal.Actions>
        <Button negative onClick={onNo}>No</Button>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Yes'
          onClick={onYes}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default DeleteUserModal;
