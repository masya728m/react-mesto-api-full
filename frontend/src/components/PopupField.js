import React from 'react';
import '../pages/index.css';

export default function PopupField(props) {
  const inputHandler = (e) => {
    const field = e.target;
    props.onChange?.(field.value);
    if (field.validity.valid) {
      props.onValidState?.();
      return;
    }
    props.onErrorOccured?.(field.validationMessage);
  };

  return (
    <div className="popup__field-wrapper">
      <input
        className={`popup__field ${props.additionalClass}`}
        onChange={inputHandler}
        type={`${props.fieldType}`}
        name={`${props.fieldName}`}
        placeholder={`${props.placeholderText}`}
        minLength={`${props.minLength || 2}`}
        maxLength={`${props.maxLength || 500}`}
        value={props.fieldValue || ''}
        required={true}
      />
      <p className="popup__field-error">{props.errorDescription || ''}</p>
    </div>
  );
}