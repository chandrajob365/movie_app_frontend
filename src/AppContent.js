import React from "react";
import Movie from "./movie";

class AppContent extends React.Component {
  render() {
    const movies = this.props.movies.map(movie => {
      return <Movie key={movie.id} movie={movie} />;
    });
    return <div className="appContent">{movies}</div>;
  }
}

export default AppContent;
