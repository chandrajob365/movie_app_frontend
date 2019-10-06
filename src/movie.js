import React, { Component } from "react";

export default class Movie extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="movie">
        <img
          className="movie_poster"
          src={movie.posterurl}
          alt={movie.poster}
        />
        <h2 style={{ fontWeight: 900 }}>
          <b>{movie.title}</b>
        </h2>
        <h3>
          <label style={{ fontWeight: 600 }}>Year: </label>
          <i>{movie.year}</i>
        </h3>
        <h3>
          <label style={{ fontWeight: 600 }}>IMDB rating: </label>
          <i>{movie.imdbRating}</i>
        </h3>
        <h3>
          <label style={{ fontWeight: 600 }}>Actors: </label>
          <i>{movie.actors.join(", ")}</i>
        </h3>
        <h3>
          <label style={{ fontWeight: 600 }}>Genres: </label>
          <i>{movie.genres.join(", ")}</i>
        </h3>
      </div>
    );
  }
}
