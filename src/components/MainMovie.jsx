import React from 'react';

const MainMovie = ({ movie, isLoading}) => {

    if (isLoading) return <p>...</p>;
    if (!movie) return <p>Oops! Please try again.</p>;
    const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

    return (
        
            <div className="movie-container" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}>
                <div className="movie-info">
                    <h2 className='movie-title'>{movie.title}</h2>
                </div>
            </div>
    );
}

export default MainMovie;
