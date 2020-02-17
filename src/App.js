import React, { Component } from "react";
import "./App.css";
import SignInUp from "./components/SignInUp";
import Tracks from "./components/Tracks";
import Artists from "./components/Artists";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import ArtistProfile from "./components/ArtistProfile";
import Donate from "./components/Donate";
import Dashboard from "./components/Dashboard";

class App extends Component {
	state = {
		tracks: [],
		artists: [],
		seekedTrack: ""
		// connected: false
	};
	handleSearch = e => {
		this.setState({
			seekedTrack: e.target.value
		});
	};

	getAllTracks = () => {
		axios
			.get("/user/artist/getAllTracks")
			.then(res => this.setState({ tracks: res.data }));
	};

	getAllArtists = () => {
		axios
			.get("/user/profile/getAllProfiles")
			.then(res => this.setState({ artists: res.data }));
	};

	componentDidMount() {
		this.getAllTracks();
		this.getAllArtists();
		// let token = localStorage.getItem("token");
		// const config = {
		// 	headers: { Authorization: token }
		// };
		// axios.get("/user/getUser", config).then(res => {
		// 	if (res.data.connected === true) {
		// 		this.setState({ connected: true });
		// 		console.log(res.data.connected + "lllllllllllll");
		// 	}
		// });
	}
	update = () => {
		this.componentDidMount();
	};
	render() {
		return (
			<div className='App'>
				<Router>
					<NavBar
						handleSearch={this.handleSearch}
						update={this.update}></NavBar>

					<Switch>
						<Route
							path='/signInUp'
							render={() => <SignInUp update={this.update} />}
						/>
						<Route
							exact
							path='/'
							render={() => (
								<Tracks
									tracks={this.state.tracks.filter(
										track =>
											track.title
												.toLowerCase()
												.trim()
												.includes(
													this.state.seekedTrack.toLowerCase().trim()
												) === true
									)}
									update={this.update}
								/>
							)}
						/>
						<Route
							path='/artists'
							render={() => <Artists artists={this.state.artists} />}
						/>
						<Route
							exact
							path='/artistProfile/:id'
							render={() => <ArtistProfile update={this.update} />}
						/>
						<Route
							exact
							path='/donate/:id'
							render={() => <Donate update={this.update} />}
						/>
						<Route
							exact
							path='/Dashboard/:id'
							render={() => <Dashboard update={this.update} />}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
