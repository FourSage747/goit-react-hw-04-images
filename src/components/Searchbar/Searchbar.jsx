import { useState } from 'react';
import css from './Searchbar.module.css'

export const Searchbar = ({onSubmit}) => {
  // state = {
  //   value: '',
  // };
  const [value, setValue] = useState('')

  const handleChange = ({ target: { value } }) => {
    // this.setState({ value });
    setValue(value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value)
    // this.setState({
    //     value: ''
    // });
    setValue('')
  }

    return (
      <header className="searchbar">
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    );
}
