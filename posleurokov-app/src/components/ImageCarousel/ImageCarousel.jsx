import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import styles from './ImageCarousel.module.scss';

const ImageCarousel = ({ images, ...rest }) => {

  const imagesUrls = images.map((elem, _) => {
    return {
      original: process.env.REACT_APP_BASE_URL + elem.image,
      thumbnail: process.env.REACT_APP_BASE_URL + elem.image,
      thumbnailClass: styles.thumbnail,
      originalClass: styles.original
    }
  });

  const RenderImages = () => {
    if (images !== undefined) {
      return <ImageGallery
        items={imagesUrls}
        showFullscreenButton={false}
        showPlayButton={false}
        showNav={false}
        autoPlay={true} />
    }
    else {
      return <div></div>
    }
  }

  return (
    <div style={{
      ...rest
    }}>
      <RenderImages />
    </div >
  );
};

export { ImageCarousel };