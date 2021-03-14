import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClick);
  }

  handleEscClick = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.onOverlayClick}>
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleEscClick: PropTypes.func,
  onOverlayClick: PropTypes.func,
  toggleModal: PropTypes.func,
};

export default Modal;
