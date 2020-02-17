import React, { Component } from "react";

export class ArtistCard extends Component {
	render() {
		const { aka, description } = this.props.artist;
		return (
			<div className='artist-card'>
				<div className='artist-cart-item'>{aka}</div>
				<div className='artist-cart-item'>{description}</div>
			</div>
		);
	}
}

export default ArtistCard;
