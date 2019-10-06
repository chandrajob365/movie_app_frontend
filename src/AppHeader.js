import React from "react";

class AppHeader extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  handleKeyUp = e => {
    console.log("handleKeyUp :: ", e.target.value);
    this.props.searchMovies(e.target.value);
  };

  handleOnChange = e => {
    console.log("handleOnChange :: ", e.target.value);
    this.setState({ inputValue: e.target.value });
  };
  render() {
    return (
      <div className="appHeader">
        <input
          type="text"
          value={this.state.inputValue || ""}
          style={{ minWidth: "400px", borderRadius: "10px", minHeight: "40px" }}
          placeholder={"Enter Movie name to search"}
          onChange={this.handleOnChange}
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}

export default AppHeader;
