import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IoSearchOutline } from 'react-icons/io5';
import 'react-toastify/dist/ReactToastify.css';
import {
  ButtonLabel,
  HeaderStyled,
  SearchForm,
  SearchFormBTN,
  SearchInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('Please, enter your query for search', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <HeaderStyled onSubmit={handleSubmit}>
      <SearchForm>
        <SearchFormBTN type="submit">
          <IoSearchOutline
            style={{
              width: '24px',
              height: '24px',
            }}
          />
          <ButtonLabel>Search</ButtonLabel>
        </SearchFormBTN>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </HeaderStyled>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
