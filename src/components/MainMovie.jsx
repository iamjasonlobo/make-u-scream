import React from 'react';

const MainMovie = ({ movie, fetchRandomHorrorMovie}) => {

    if (!movie) return <p>Loading...</p>;
    const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

    return (
        <div>
            <div className="movie-container" style={{ backgroundImage: `url(${imageUrl})`, width: '500px', height: '300px', backgroundSize: 'cover' }}>
                <div className="movie-info">
                    <h2>{movie.title}</h2>
                    <button onClick={fetchRandomHorrorMovie}>Discover</button>
                </div>
            </div>
        </div>
    );
}

export default MainMovie;
