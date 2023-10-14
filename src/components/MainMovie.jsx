import React from 'react';

const MainMovie = ({ movie, isLoading}) => {

    if (isLoading) return <p>...</p>;
    if (!movie) return <p>Oops! Please try again.</p>;
    const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

    return (
        <div>
            <div className="movie-container" style={{ backgroundImage: `url(${imageUrl})`, width: '500px', height: '300px', backgroundSize: 'cover' }}>
                <div className="movie-info">
                    <h2>{movie.title}</h2>
                </div>
            </div>
        </div>
    );
}

export default MainMovie;
