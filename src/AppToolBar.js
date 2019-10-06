import React from "react";
import Sorter from "./Sorter";
import Filter from "./Filter";
class AppToolBar extends React.Component {
  render() {
    return (
      <div className="appToolBar">
        <Sorter sortMovies={this.props.sortMovies} />
        <Filter
          genres={this.props.genres}
          actors={this.props.actors}
          filterMovies={this.props.filterMovies}
        />
      </div>
    );
  }
}

export default AppToolBar;
