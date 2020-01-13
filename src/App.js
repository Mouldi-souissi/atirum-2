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
		artists: []
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
	}
	update = () => {
		this.componentDidMount();
	};
	render() {
		console.log(this.state.artists + "saleeeemmmmmmmm");
		return (
			<div className='App'>
				<Router>
					<NavBar></NavBar>
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
									tracks={this.state.tracks}
									// update={this.componentDidMount()}
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
							render={() => <ArtistProfile />}
						/>
						<Route
							exact
							path='/donate/:id'
							render={() => <Donate update={this.update} />}
						/>
						<Route exact path='/Dashboard/:id' render={() => <Dashboard />} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
