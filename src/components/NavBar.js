import React, { Component } from "react";
import logok from "../assets/logok2.png";
import { Link, Redirect } from "react-router-dom";
import SearchBar from "./Search";

export class Search extends Component {
	render() {
		return (
			<div>
				<div className='navbar'>
					<img src={logok} alt='img' width='20%' />

					<ul className='nav-menu'>
						<Link to='/'>
							<li>TRACKS</li>
						</Link>
						<Link to='/artists'>
							<li>ARTISTS</li>
						</Link>
						{localStorage.getItem("token") !== null ? (
							<Link
								to='/'
								onClick={() => {
									window.localStorage.removeItem("token");
									this.props.update();
								}}>
								<li>Log out</li>
							</Link>
						) : (
							<Link to='/signInUp'>
								<li>SIGN IN-UP</li>
							</Link>
						)}

						<SearchBar handleSearch={this.props.handleSearch} />
					</ul>
				</div>
			</div>
		);
	}
}

export default Search;
