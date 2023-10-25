import React from 'react'
import Dialog from 'react-native-dialog'

const DeleteDialog = ({ visible, setVisible, handleDelete }) => {

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Recipe delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this recipe? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
      <Dialog.Button label="Delete" onPress={handleDelete} />
    </Dialog.Container>
  )
}

export default DeleteDialog
