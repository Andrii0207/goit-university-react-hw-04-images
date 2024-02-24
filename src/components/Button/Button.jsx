import PropTypes from 'prop-types';
import { StyledBTN } from './Button.styled';

export default function LoadMoreBTN({ onClick }) {
  return (
    <StyledBTN type="button" onClick={onClick}>
      Load more...
    </StyledBTN>
  );
}

LoadMoreBTN.propTypes = {
  onClick: PropTypes.func.isRequired,
};
