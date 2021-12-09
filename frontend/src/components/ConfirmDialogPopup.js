import React from 'react';
import PopupWithForm from './PopupWithForm';

export const ConfirmDialogPopup = React.memo((props) => {
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setButtonText('Да');
  }, [props.isOpen]);

  const handleSubmit = () => {
    setButtonText('Сохранение...');
    props.onSubmit?.();
  };

  return (
    <PopupWithForm
      name="confirmation-dialog"
      opened={props.isOpen}
      title="Вы уверены?"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      enableSubmitButton={true}
    />
  );
});