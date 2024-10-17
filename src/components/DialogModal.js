import React from 'react';
import Dialog from 'react-native-dialog';

const DialogModal = ({
  title,
  description,
  handlerLabel,
  visible,
  setVisible,
  handler
}) => {
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
      <Dialog.Button label={handlerLabel} onPress={handler} />
    </Dialog.Container>
  );
};

export default DialogModal;
