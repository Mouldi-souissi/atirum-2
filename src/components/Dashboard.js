import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
export class Dashboard extends Component {
	state = {
		description: "",
		aka: "",
		img: "https://s2.qwant.com/thumbr/0x380/d/7/9b9c8b487942e22493ac78df765dd696c5ee8a0748e1d9a9c48b5ae706a418/bad-profile-pic-2-768x768.jpeg?u=https%3A%2F%2Fwww.jennstrends.com%2Fwp-content%2Fuploads%2F2013%2F10%2Fbad-profile-pic-2-768x768.jpeg&q=0&b=1&p=0&a=1",

		isAdding: false,
		track: { title: "", price: 0, videoUrl: "" },
		isEdisting: false,
		file: {},
		success: false
	};

	handleProfileData = () => {
		if (!this.state.isEdisting) {
			axios
				.post("/user/profile/addProfile", {
					description: this.state.description,
					aka: this.state.aka,
					userId: this.props.match.params.id,
					img: this.state.img
				})
				.then(
					() =>
						this.props.history.push(
							`/artistProfile/${this.props.match.params.id}`
						),
					this.props.update()
				);
		} else
			axios
				.put(`/user/profile/editProfile/${this.props.match.params.id}`, {
					description: this.state.description,
					aka: this.state.aka,
					img: this.state.img
				})
				.then(
					() =>
						this.props.history.push(
							`/artistProfile/${this.props.match.params.id}`
						),
					this.props.update()
				);
	};
	handleTrack = () => {
		axios
			.post("/user/artist/addTrack", {
				track: this.state.track,
				artistID: this.props.match.params.id,
				artist: this.state.aka
			})
			.then(() => alert("Track saved"), this.props.update());
	};
	// handleUpload = e => {
	// 	this.setState(
	// 		{
	// 			file: e.target.files
	// 		},
	// 		() => {
	// 			console.log("hello");
	// 			console.log(this.state.file, "this.state.file");
	// 		}
	// 	);
	// };
	// onSubmit = () => {
	// 	const formData = new FormData();
	// 	formData.append("file", this.state.file[0]);
	// 	axios
	// 		.put("/user/artist/upload/5e1d8dba9c5de9321caf831a", formData)
	// 		.then(res => {
	// 			console.log("res", res);
	// 			this.setState({ success: true });
	// 		})
	// 		.catch(err => console.log("err", err));
	// };
	componentDidMount = () => {
		// (!this.state.aka || !this.state.description || !this.state.description) &&
		axios
			.get(`/user/profile/getProfileById/${this.props.match.params.id}`)
			.then(res => {
				if (res.data) {
					this.setState({
						aka: res.data.aka,
						description: res.data.description,
						img: res.data.img,
						videoUrl: res.data.videoUrl,
						isEdisting: true
					});
				}
			});
	};
	render() {
		return (
			<div className='dashboard'>
				<label>Artist:</label>
				<input
					onChange={e => this.setState({ aka: e.target.value })}
					defaultValue={this.state.aka}></input>
				<label>Description:</label>
				<input
					onChange={e => this.setState({ description: e.target.value })}
					defaultValue={this.state.description}></input>
				<labal>Image url:</labal>
				<input
					onChange={e => this.setState({ img: e.target.value })}
					defaultValue={this.state.img}
				/>
				<button
					onClick={() => this.setState({ isAdding: !this.state.isAdding })}>
					Add track
				</button>
				{this.state.isAdding && (
					<div>
						<label>title:</label>
						<input
							onChange={e =>
								this.setState({
									track: { ...this.state.track, title: e.target.value }
								})
							}
						/>
						<label>price:</label>
						<input
							onChange={e =>
								this.setState({
									track: { ...this.state.track, price: e.target.value }
								})
							}
						/>
						<label>Video url:</label>
						<input
							type='text'
							onChange={e =>
								this.setState({
									track: { ...this.state.track, videoUrl: e.target.value }
								})
							}
						/>
						<button onClick={this.handleTrack}>save track</button>
						{/* <form
							ref='uploadForm'
							id='uploadForm'
							action={`http://localhost:5000/user/artist/upload/5e1d8dba9c5de9321caf831a`}
							method='post'
							encType='multipart/form-data'>
							<input type='file' name='file' />
							<input type='submit' value='Upload!' />
						</form> */}
						{/* <div style={{ display: "flex", flexDirection: "column" }}>
							<input
								type='file'
								onChange={this.handleUpload}
								className='custom-file-input'
							/>
							<button onClick={this.onSubmit}>Submit</button>
							{this.state.success ? <h1>Upload Success</h1> : null}
						</div> */}
					</div>
				)}
				<button onClick={this.handleProfileData}>
					Save and go to my profile
				</button>
			</div>
		);
	}
}

export default withRouter(Dashboard);
