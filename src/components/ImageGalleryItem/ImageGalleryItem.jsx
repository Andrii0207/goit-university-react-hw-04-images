import PropTypes from 'prop-types';
import { GalleryItem, StyledImg } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
  openModal,
}) {
  return (
    <GalleryItem>
      <StyledImg
        src={webformatURL}
        alt={tags}
        onClick={() => openModal({ modalImg: largeImageURL, textAlt: tags })}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
