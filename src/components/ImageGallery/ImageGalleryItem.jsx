import PropTypes from 'prop-types';

function ImageGalleryItem({ images, onImageClick }) {
  const handleOnClick = e => {
    onImageClick(e.target.srcset);
  };
  return images.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li key={id}>
      <img
        src={webformatURL}
        srcSet={largeImageURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={handleOnClick}
      />
    </li>
  ));
}

ImageGalleryItem.protoType = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      src: PropTypes.string,
      srcSet: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
  onImageClick: PropTypes.func,
};

export default ImageGalleryItem;
