import React, { Component } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { Link } from "react-router-dom";
import axios from "axios";

export class TrackCard extends Component {
	handleDeleteTrack = () => {
		axios
			.delete(`/user/artist/deleteTrackById/${this.props.track._id}`)
			.then(() => this.props.update());
	};
	render() {
		const {
			title,
			price,
			video,
			_id,
			donations,
			artist,
			videoUrl
		} = this.props.track;
		console.log(video);
		return (
			<div className='track-container'>
				<div className='trackCard'>
					<div>
						<div className='trackCard-item'>Title: {title}</div>
						<div className='trackCard-item'>Artist: {artist}</div>
						<div className='trackCard-item'> Price: {price}D</div>
						<div className='trackCard-item'> Donations: {donations}D</div>
						{this.props.theOne && (
							<button onClick={this.handleDeleteTrack}>Delete</button>
						)}
					</div>
					{!(donations >= price) && (
						<Link to={`/donate/${_id}`}>
							<button className='donate-btn'>Donate</button>
						</Link>
					)}
				</div>
				<div className='video'>
					{donations >= price && (
						// <Player>
						// 	<source src={`http://localhost:5000/public/${video}`} />
						// </Player>
						<iframe
							title='track'
							width='750'
							height='400'
							src={`https://www.youtube.com/embed/${videoUrl}`}
							frameborder='0'
							allowfullscreen
							ng-show='showvideo'></iframe>
					)}
				</div>
			</div>
		);
	}
}

export default TrackCard;
