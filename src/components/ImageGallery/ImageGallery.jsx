import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Audio } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';


export const ImageGallery = ({state, handleSubmit, openModal, closeModal}) => {


    const { photo, isLoading, page, totalPage, largeImageURL } = state;
    return (
      <div>
        <ul className={css.gallery} onClick={openModal}>
          {photo &&
            photo.map(el => (
              <ImageGalleryItem key={el.id} imageS={el} />
            ))}
        </ul>
        {isLoading && <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
        />}
        {largeImageURL && <Modal largeImageURL={largeImageURL} closeModal={closeModal}/>}
        {page*12 <= totalPage && photo && !isLoading && <Button handleSubmit={handleSubmit} />}
      </div>
    );
}
