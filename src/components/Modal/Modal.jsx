import { useEffect } from 'react';
import css from './Modal.module.css'

export const Modal = ({largeImageURL, closeModal}) => {

  // componentDidMount() {
  //   window.addEventListener('keydown', this.onKeydownEsc);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onKeydownEsc);
  // }

  // onKeydownEsc = e => {
  //   if (e.code === 'Escape') this.props.closeModal();
  // };
  useEffect(() =>  {
      const onKeydownEsc = (e) => {
          if (e.code === 'Escape') closeModal()
      }
      window.addEventListener('keydown', onKeydownEsc);
      return () => {
          window.removeEventListener('keydown', onKeydownEsc);
      }
  },[closeModal])

    // const { largeImageURL, closeModal } = this.props;
    

    
    return (
        <div className={css.Overlay} onClick={closeModal}>
            <div className="Modal">
                <img src={largeImageURL} alt="" width="800" />
            </div>
        </div>
    );
}
