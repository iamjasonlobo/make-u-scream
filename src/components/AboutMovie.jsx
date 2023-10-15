import React, { useState, useEffect } from 'react';

const AboutMovie = ({ movie, ACCESS_KEY, addToBanList }) => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${ACCESS_KEY}`);
                const data = await response.json();
                setLanguages(data);
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };

        fetchLanguages();
    }, [ACCESS_KEY]);

    const getEnglishName = (langCode) => {
        const langObj = languages.find(lang => lang.iso_639_1 === langCode);
        return langObj ? langObj.english_name : langCode;
    }

    if (!movie) return <p>Loading...</p>;
    const releaseYear = movie.release_date.split('-')[0];

    return (
            <div className="movie-info">
                <h3>About Movie</h3>
                        <button className='about-btn' onClick={() => addToBanList(releaseYear)}>{releaseYear}</button>
                        <button className='about-btn' onClick={() => addToBanList(getEnglishName(movie.original_language))}>{getEnglishName(movie.original_language)}</button>
                        <button className='about-btn' onClick={() => addToBanList(movie.vote_average.toString())}>{movie.vote_average}</button>
            </div>
    );
}

export default AboutMovie;
