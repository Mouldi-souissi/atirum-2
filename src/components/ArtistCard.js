import React, { Component } from "react";

export class ArtistCard extends Component {
	render() {
		const { AKA, description } = this.props.artist;
		return (
			<div className='artist-card'>
				<div className='artist-cart-item'>{AKA}</div>
				<div className='artist-cart-item'>{description}</div>
			</div>
		);
	}
}

export default ArtistCard;
