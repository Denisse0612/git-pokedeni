import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import ReactPaginate from 'react-paginate';
import '../pages/styles/PokedexPage.css';

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('allPokemons');
  const [currentPage, setCurrentPage] = useState(0); // Estado para el número de página actual

  const trainerName = useSelector(store => store.trainerName);

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const [pokemons, getPokemons, getByTypePokemons] = useFetch(url);

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      getPokemons();
    } else {
      getByTypePokemons(selectValue);
    }
    // Reiniciar la página actual cuando se cambia la selección
    setCurrentPage(0);
  }, [selectValue]);

  const inputSearch = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.toLowerCase().trim());
    inputSearch.current.value = '';
  };

  const cbFilter = (poke) => {
    const nameFiltered = poke.name.includes(inputValue);
    return nameFiltered;
  };

  // Configuración para la paginación
  const pokemonsPerPage = 15;
  const offset = currentPage * pokemonsPerPage;

  const pageCount = Math.ceil(pokemons?.results.filter(cbFilter).length / pokemonsPerPage);

  const handlePageChange = selectedPage => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="intro">
      <p className="intro__p">Hola <span className="intro__name">{trainerName}</span>, aquí podrás encontrar tu pokemón favorito❗❗</p>
      <div className="intro__poke">
        <form className="intro__form" onSubmit={handleSubmit}>
          <input className="intro__input" ref={inputSearch} type="text" />
          <button className="intro__btn">Buscar</button>
        </form>
        <SelectType
          setSelectValue={setSelectValue}
        />
      </div>
      <div className="card__container">
        {pokemons?.results
          .filter(cbFilter)
          .slice(offset, offset + pokemonsPerPage)
          .map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))}
      </div>

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

    </div>


  )
}

export default PokedexPage