import React from "react";

export default class Search extends React.Component {

  render() {
    return <div>
      <label for="searchField">Search</label><br/>
      <input type="search" name="searchField"/>
    </div>
  }

}
