import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import TrackCard from "./TrackCard";

export class ArtistProfile extends Component {
	state = {
		artistInfo: {},
		tracks: [],
		description: "",
		aka: "",
		profile: { AKA: "", description: "" }
	};
	getArtistById = () => {
		axios
			.get(`/user/getArtistBy/${this.props.match.params.id}`)
			.then(info => this.setState({ artistInfo: info.data }));
	};

	getTracksByArtist = () => {
		axios
			.get(`/user/artist/getTracksBy/${this.props.match.params.id}`)
			.then(res => this.setState({ tracks: res.data }));
	};
	handleProfileData = () => {
		axios
			.post("/user/profile/addProfile", {
				description: this.state.description,
				aka: this.state.aka,
				userId: this.props.match.params.id
			})
			.then(this.getProfile);
	};
	getProfile = () => {
		axios
			.get(`/user/profile/getProfileById/${this.props.match.params.id}`)
			.then(res => this.setState({ profile: res.data ? res.data : "" }));
	};
	componentDidMount() {
		this.getArtistById();
		this.getTracksByArtist();
		this.getProfile();
	}

	render() {
		return (
			<div>
				{/* <img className='profile-image' alt='avatar'></img> */}
				{/* <div className='artist-name'>{this.state.artistInfo.email}</div> */}
				<div className='artist-desc'>{this.state.profile.AKA}</div>
				<div>{this.state.profile.description}</div>

				{this.state.tracks.map(track => (
					<TrackCard key={track._id} track={track} />
				))}
			</div>
		);
	}
}

export default withRouter(ArtistProfile);
