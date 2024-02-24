import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ imageList, openModal }) {
  return (
    <Gallery>
      {imageList.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape).isRequired,
  openModal: PropTypes.func.isRequired,
};
