import React from "react";

export default class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedActor: "select",
      selectedGenre: "select"
    };
  }

  handleChange = e => {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState({ ...obj }, () => {
      this.props.filterMovies([
        {
          type: "actors",
          selectedData:
            this.state.selectedActor === "select"
              ? ""
              : this.state.selectedActor
        },
        {
          type: "genres",
          selectedData:
            this.state.selectedGenre === "select"
              ? ""
              : this.state.selectedGenre
        }
      ]);
    });
  };

  render() {
    const { selectedGenre, selectedActor } = this.state;
    const actorsOptions = this.props.actors.map((actor, index) => {
      return (
        <option value={actor} key={index}>
          {" "}
          {actor}
        </option>
      );
    });
    const genreOptions = this.props.genres.map((genre, index) => {
      return (
        <option value={genre} key={index}>
          {genre}
        </option>
      );
    });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <label style={{ fontWeight: 600, marginBottom: "10px" }}>
          Filter By:{" "}
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
          onChange={this.handleChange}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <label style={{ fontWeight: 600, marginBottom: "10px" }}>
              Actors:{" "}
            </label>
            <select
              id="actors"
              name="selectedActor"
              onChange={() => {}}
              value={selectedActor}
            >
              <option value="select"> Select </option>
              {actorsOptions}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10px"
            }}
          >
            <label style={{ fontWeight: 600, marginBottom: "10px" }}>
              Genres:{" "}
            </label>
            <select
              id="genres"
              name="selectedGenre"
              onChange={() => {}}
              value={selectedGenre}
              style={{ minWidth: "200px" }}
            >
              <option value="select"> Select </option>
              {genreOptions}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
