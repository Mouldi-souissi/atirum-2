import React, { Component } from "react";
import { Link } from "react-router-dom";
import ArtistCard from "./ArtistCard";
export class Artists extends Component {
	render() {
		return (
			<div className='artists'>
				<p className='title-tracks'>Artists: </p>
				{this.props.artists.map(artist => (
					<Link
						to={`/artistProfile/${artist._id}`}
						style={{ textDecoration: "none" }}>
						<ArtistCard key={artist.id} artist={artist} />
					</Link>
				))}
			</div>
		);
	}
}

export default Artists;
