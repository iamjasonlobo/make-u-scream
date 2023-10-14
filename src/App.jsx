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
  const [isLoading, setIsLoading] = useState(true);

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

  const getEnglishName = (langCode, languages) => {
    const langObj = languages.find(lang => lang.iso_639_1 === langCode);
    return langObj ? langObj.english_name : langCode;
}


const fetchRandomHorrorMovie = async () => {
  setIsLoading(true);
  if (!horrorGenreId) return;

  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const responseMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_KEY}&with_genres=${horrorGenreId}&page=${randomPage}`);
    const dataMovies = await responseMovies.json();

    const responseLanguages = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${ACCESS_KEY}`);
    const languagesData = await responseLanguages.json();

    const viableMovies = dataMovies.results.filter(movie => 
      !hasBannedAttributes(movie, languagesData) && 
      !prevMovies.includes(movie.id)
    );

    if (viableMovies.length > 0) {
      const randomMovie = viableMovies[Math.floor(Math.random() * viableMovies.length)];
      setMovie(randomMovie);
      setPrevMovies(prevMovies => [...prevMovies, randomMovie.id]);
    } else {
      setMovie(null);
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
  } finally {
    setIsLoading(false); 
  }
};

const hasBannedAttributes = (movie, languages) => {
  const releaseYear = movie.release_date.split('-')[0];
  const language = getEnglishName(movie.original_language, languages);
  const voteAverage = movie.vote_average.toString();

  return banList.includes(releaseYear) || banList.includes(language) || banList.includes(voteAverage);
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
        <button onClick={fetchRandomHorrorMovie}>Click Me</button>
      </div>

      <div className='main'>
      <MainMovie movie={movie} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default App
