import React, { Component } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { Link } from "react-router-dom";

export class TrackCard extends Component {
	render() {
		const { title, price, video, _id, donations } = this.props.track;
		console.log(video);
		return (
			<div className='trackCard'>
				<div>
					<div className='trackCard-item'>Title: {title}</div>
					<div className='trackCard-item'> Price: {price}</div>
					<div className='trackCard-item'> donations: {donations}D</div>
					{donations >= price && (
						<Player>
							<source src={`http://localhost:6000/${video}`} />
						</Player>
					)}
				</div>
				<Link to={`/donate/${_id}`}>
					<button className='donate-btn'>Donate</button>
				</Link>
			</div>
		);
	}
}

export default TrackCard;
