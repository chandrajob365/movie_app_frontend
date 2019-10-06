import React from "react";
import Movie from "./movie";

class AppContent extends React.Component {
  handleScroll = e => {
    let element = e.target;
    if (element.scrollHeight - element.scrollTop - 500 < element.clientHeight) {
      this.props.hasMore && this.props.paginatedFetch();
    }
  };
  render() {
    const movies = this.props.movies.map(movie => {
      return <Movie key={movie.id} movie={movie} />;
    });
    return (
      <div className="appContent" onScroll={this.handleScroll}>
        {movies}
        {this.props.isLoading && (
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            Loading.....
          </div>
        )}
      </div>
    );
  }
}

export default AppContent;
