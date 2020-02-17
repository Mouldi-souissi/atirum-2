import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import TrackCard from "./TrackCard";
import { Link } from "react-router-dom";

export class ArtistProfile extends Component {
	state = {
		artistInfo: {},
		tracks: [],
		description: "",
		aka: "",
		profile: { aka: "", description: "" },
		theOne: false
	};
	// getArtistById = () => {
	// 	axios
	// 		.get(`/user/getArtistBy/${this.props.match.params.id}`)
	// 		.then(info => this.setState({ artistInfo: info.data }));
	// };

	getTracksByArtist = () => {
		axios
			.get(`/user/artist/getTracksBy/${this.props.match.params.id}`)
			.then(res => this.setState({ tracks: res.data }));
	};

	getProfile = () => {
		axios
			.get(`/user/profile/getProfileById/${this.props.match.params.id}`)
			.then(res => this.setState({ profile: res.data ? res.data : "" }));
	};
	componentDidMount() {
		// this.getArtistById();
		this.getTracksByArtist();
		this.getProfile();
		let token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: token }
		};
		axios.get("/user/getUser", config).then(res => {
			if (res.data !== "Unauthorized") {
				console.log("res.data", res.data);
				if (res.data._id === this.props.match.params.id) {
					this.setState({ theOne: true });
				}
			}
		});
	}

	render() {
		return (
			<div>
				<div className='background-profile'>
					<div className='artist-profile'>
						<div className='img-container'>
							<img
								className='profile-img'
								src={this.state.profile.img}
								alt='img'></img>
						</div>

						<div className='profile-desc'>
							<div>{this.state.profile.aka}</div>
							<div>{this.state.profile.description}</div>
							{this.state.theOne && (
								<Link to={`/dashboard/${this.props.match.params.id}`}>
									<button>Edit profile</button>
								</Link>
							)}
						</div>
					</div>
				</div>

				{this.state.tracks.map(track => (
					<TrackCard
						key={track._id}
						track={track}
						theOne={this.state.theOne}
						update={this.props.update}
					/>
				))}
			</div>
		);
	}
}

export default withRouter(ArtistProfile);
