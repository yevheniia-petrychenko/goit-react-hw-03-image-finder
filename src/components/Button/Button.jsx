import PropTypes from 'prop-types';

function Button({ onBtnClick }) {
  return (
    <button className="Button" type="button" onClick={onBtnClick}>
      Load More
    </button>
  );
}

Button.propTypes = { onBtnClick: PropTypes.func };

export default Button;
