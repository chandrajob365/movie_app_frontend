import React from "react";
const inputs = [["IMDB Rating", "imdbRating"], ["Year", "year"]];
export default class Sorter extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedValue: "imdbRating"
    };
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({ selectedValue: value });
    this.props.sortMovies(value);
  };
  render() {
    const radioButtons = inputs.map((value, index) => {
      return (
        <div key={index}>
          <input
            type="radio"
            value={value[1]}
            onChange={() => {}}
            checked={this.state.selectedValue === value[1]}
            style={{ marginBottom: "10px" }}
          />{" "}
          &nbsp;
          {value[0]}
        </div>
      );
    });
    return (
      <div className="tools" style={{ marginRight: "50px" }}>
        <label style={{ fontWeight: 600, marginBottom: "10px" }}>
          Sort By:{" "}
        </label>
        <div onChange={this.handleChange}>{radioButtons}</div>
      </div>
    );
  }
}
