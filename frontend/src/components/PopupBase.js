import React from 'react';

export default class PopupBase extends React.Component {
  constructor(props) {
    super(props);
    const functor = props.opened ? document.addEventListener : document.removeEventListener;
    functor.apply(document, ['keydown', this.handleEcsClose]);
    functor.apply(document, ['click', this.handleClickClose]);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const functor = this.props.opened ? document.addEventListener : document.removeEventListener;
    functor.apply(document, ['keydown', this.handleEcsClose]);
    functor.apply(document, ['click', this.handleClickClose]);
  }

  handleEcsClose = (e) => {
    if (e.key === 'Escape')
      this.props.onClose?.();
  };

  handleClickClose = (e) => {
    if (e.target.classList.contains(`popup_type_${this.props.name}`))
      this.props.onClose?.();
  };
}