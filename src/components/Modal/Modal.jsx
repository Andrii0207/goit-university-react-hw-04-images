import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ modalImg, textAlt, onCloseModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
  });

  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
  });

  const handlePressKey = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>
        <img src={modalImg} alt={textAlt} />
      </StyledModal>
    </StyledOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
