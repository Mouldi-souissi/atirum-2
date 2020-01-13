import React, { Component } from "react";
import logo from "../assets/logo3.png";
import { Link } from "react-router-dom";

export class Search extends Component {
	render() {
		return (
			<div>
				<div className='navbar'>
					<img src={logo} alt='img' width='20%' />

					<ul className='nav-menu'>
						<Link to='/'>
							<li>Tracks</li>
						</Link>
						<Link to='/artists'>
							<li>Artists</li>
						</Link>
						<Link to='/signInUp'>
							<li>Sign in/up</li>
						</Link>
					</ul>
				</div>
			</div>
		);
	}
}

export default Search;
