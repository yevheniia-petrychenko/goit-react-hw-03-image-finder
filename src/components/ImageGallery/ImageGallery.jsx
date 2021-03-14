import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} onImageClick={onImageClick} />
    </ul>
  );
};

ImageGallery.propType = {
  images: PropTypes.array,
  onImageClick: PropTypes.func,
  ImageGalleryItem: PropTypes.elementType,
};

export default ImageGallery;
