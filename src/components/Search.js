import React, { Component } from "react";

export class Search extends Component {
	render() {
		return (
			<div>
				<input
					type='text'
					placeholder='Search'
					onChange={this.props.handleSearch}
				/>
			</div>
		);
	}
}

export default Search;
