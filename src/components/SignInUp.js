import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import jwt_decode from "jwt-decode";

// import ReactPlayer from "react-player";

// import z from "../../backend/public/video_undefined.mp3";

export class SignInUp extends Component {
	state = {
		email: "",
		password: ""
	};

	handleInputs = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSignUp = () => {
		axios.post("/user/register", this.state).then(this.handleSignIn);
	};

	handleSignIn = () => {
		axios.post("/user/login", this.state).then(res => {
			if (res.data === "invalid credentials") alert("invalid credentials");
			else {
				localStorage.setItem("token", res.data.token);
				const decoded = jwt_decode(localStorage.token);
				this.props.history.push(`/Dashboard/${decoded.id}`);
				this.props.update();
			}
		});
	};

	handleAddTrack = () => {
		axios
			.post(
				"/user/artist/addTrack",
				{ title: "hero" },
				{
					headers: {
						Authorization: localStorage.getItem("token")
					}
				}
			)
			.then(res => {
				console.log(res);
			});
	};

	render() {
		return (
			<div className='sign-in-up container'>
				<p className='row d-flex justify-content-center log-title'>
					Sign in/up
				</p>
				<form>
					<label className='col-2'>email:</label>
					<input
						className='col-10'
						type='email'
						name='email'
						placeholder='Type your email'
						onChange={this.handleInputs}></input>
					<label className='col-2'>Password:</label>
					<input
						className='col-10'
						type='password'
						name='password'
						onChange={this.handleInputs}></input>
					{/* <input type='checkbox' name='vehicle1' value='artist' /> I am an
					artist
					<input type='checkbox' name='vehicle2' value='fan' /> I am a fan */}
				</form>
				<div className=' row d-flex justify-content-center'>
					<button className='col-3 btn-login' onClick={this.handleSignIn}>
						Sign in
					</button>
					<button className='col-3 btn-login' onClick={this.handleSignUp}>
						Sign up
					</button>
					{/* <button onClick={this.handleAddTrack}>add track</button> */}
				</div>
				{/* 
				<ReactPlayer
					playing
					url={[
						{ src: "./gg.mp4", type: "video/mp4" }
						// { src: "zzz.mp3", type: "audio/mp3" }
					]}
				/> */}
			</div>
		);
	}
}

export default withRouter(SignInUp);
