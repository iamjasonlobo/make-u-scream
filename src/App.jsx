import { useState, useEffect } from 'react';
import './App.css';
import MainMovie from './components/MainMovie';
import AboutMovie from './components/AboutMovie';
import BanList from './components/BanList';

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

function App() {
  const [movie, setMovie] = useState(null);
  const [prevMovies, setPrevMovies] = useState([]);
  const [horrorGenreId, setHorrorGenreId] = useState(null);
  const [banList, setBanList] = useState([]);

  useEffect(() => {
    const fetchHorrorGenreId = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ACCESS_KEY}`);
        const data = await response.json();
        const horrorGenre = data.genres.find(genre => genre.name === 'Horror');
        if (horrorGenre) {
          setHorrorGenreId(horrorGenre.id);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchHorrorGenreId();
  }, []);

  const fetchRandomHorrorMovie = async () => {
    if (!horrorGenreId) return;

    try {
      const randomPage = Math.floor(Math.random() * 100) + 1;
      const responseMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_KEY}&with_genres=${horrorGenreId}&page=${randomPage}`);
      const dataMovies = await responseMovies.json();
      const randomMovie = dataMovies.results[Math.floor(Math.random() * dataMovies.results.length)];

      setMovie(randomMovie);
      setPrevMovies(prevMovies => [...prevMovies, randomMovie]);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchRandomHorrorMovie();
  }, [horrorGenreId]);

  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList(prev => [...prev, attribute]);
    }
  }

  const removeFromBanList = (attribute) => {
    setBanList(prev => prev.filter(item => item !== attribute));
  }

  return (
    <div className='App'>
      <div className='header'>
        <p>Make U Scream</p>
      </div>

      <div className='sidebar'>
        <AboutMovie
          movie={movie}
          ACCESS_KEY={ACCESS_KEY}
          addToBanList={addToBanList}
        />

        <BanList banList={banList} removeFromBanList={removeFromBanList} />
      </div>

      <div className='main'>
        <MainMovie movie={movie} fetchRandomHorrorMovie={fetchRandomHorrorMovie} />
      </div>
    </div>
  )
}

export default App
