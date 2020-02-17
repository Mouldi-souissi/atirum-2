import React, { Component } from "react";
import TrackCard from "./TrackCard";
import { Link } from "react-router-dom";

export class Tracks extends Component {
	render() {
		return (
			<div>
				<p className='title-tracks'>Tracks:</p>
				{this.props.tracks.map(track => (
					<Link
						to={`/artistProfile/${track.artistID}`}
						style={{ textDecoration: "none" }}>
						<TrackCard
							key={track._id}
							track={track}
							// update={this.props.update}
						/>
					</Link>
				))}
			</div>
		);
	}
}

export default Tracks;
