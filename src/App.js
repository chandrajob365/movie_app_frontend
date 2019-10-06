import React from "react";
import axios from "axios";
import "./App.css";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppToolBar from "./AppToolBar";

class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: false };
  }
  componentDidMount() {
    this.paginatedFetch();
  }

  paginatedFetch = () => {
    const pageNumber =
      this.state.pageNumber && this.state.pageNumber !== 0
        ? this.state.pageNumber + 1
        : 0;
    const currentMovieList = this.state.movies || [];
    const currentOriginalMovieList = this.state.originalMoviesSet || [];
    this.setState({ isLoading: true });
    !this.state.isLoading &&
      axios
        .get("http://localhost:4444/fetchPaginatedData", {
          params: {
            page: pageNumber
          }
        })
        .then(response => {
          this.setState(
            {
              movies: [...currentMovieList, ...response.data.content],
              originalMoviesSet: [
                ...currentOriginalMovieList,
                ...response.data.content
              ],
              pageNumber: pageNumber || pageNumber + 1,
              isLoading: false,
              hasMore: response.data.hasMoreData
            },
            () => {}
          );
        })
        .catch(function(error) {
          // handle error
          console.log("err : ", error);
        });
  };
  isEmpty = data => data.length === 0;

  filterMovies = selectedState => {
    let filteredMovieList = [];
    if (
      this.isEmpty(selectedState[0].selectedData) &&
      this.isEmpty(selectedState[1].selectedData)
    ) {
      filteredMovieList = this.state.originalMoviesSet;
    } else if (
      !this.isEmpty(selectedState[0].selectedData) &&
      !this.isEmpty(selectedState[1].selectedData)
    ) {
      filteredMovieList = this.state.originalMoviesSet.filter(movie => {
        return (
          movie[selectedState[0].type].indexOf(
            selectedState[0].selectedData
          ) !== -1 &&
          movie[selectedState[1].type].indexOf(
            selectedState[1].selectedData
          ) !== -1
        );
      });
    } else if (!this.isEmpty(selectedState[0].selectedData)) {
      filteredMovieList = this.state.originalMoviesSet.filter(movie => {
        return (
          movie[selectedState[0].type].indexOf(
            selectedState[0].selectedData
          ) !== -1
        );
      });
    } else if (!this.isEmpty(selectedState[1].selectedData)) {
      filteredMovieList = this.state.originalMoviesSet.filter(movie => {
        return (
          movie[selectedState[1].type].indexOf(
            selectedState[1].selectedData
          ) !== -1
        );
      });
    }
    this.setState({ movies: filteredMovieList });
  };

  createUniqueActorsAndGenreSet = () => {
    const { movies } = this.state;
    const actors = [];
    const genres = [];
    movies.forEach(movie => {
      movie.actors.forEach(actor => {
        if (actors.indexOf(actor) === -1) {
          actors.push(actor);
        }
      });
      movie.genres.forEach(genre => {
        if (genres.indexOf(genre) === -1) {
          genres.push(genre);
        }
      });
    });
    this.setState({ genres, actors });
  };

  sortMovies = sorterAttribute => {
    const sortedMovieList = this.state.movies.sort((a, b) => {
      if (a[sorterAttribute] > b[sorterAttribute]) return -1;
      return 1;
    });
    this.setState({ movies: sortedMovieList });
  };

  searchMovies = searchKey => {
    console.log("************* Search Movies called, searchKey :: ", searchKey);
    if (this.isEmpty(searchKey)) {
      this.setState({ movies: this.state.originalMoviesSet });
    } else {
      const updatedList = this.state.originalMoviesSet.filter(
        movie =>
          movie.title.toUpperCase().indexOf(searchKey.toUpperCase()) !== -1
      );
      this.setState({ movies: updatedList });
    }
  };

  debouncedSearchMovies = limit => {
    let timer = null;
    return searchKey => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => this.searchMovies(searchKey), limit);
    };
  };

  render() {
    return (
      <div className="app">
        <AppHeader searchMovies={this.debouncedSearchMovies(300)} />
        <AppToolBar
          sortMovies={this.sortMovies}
          filterMovies={this.filterMovies}
          actors={this.state.actors || []}
          genres={this.state.genres || []}
        />
        {this.state && this.state.movies && this.state.movies.length > 0 && (
          <AppContent
            paginatedFetch={this.paginatedFetch}
            movies={this.state.movies}
            isLoading={this.state.isLoading}
            hasMore={this.state.hasMore}
          />
        )}
      </div>
    );
  }
}

export default App;
