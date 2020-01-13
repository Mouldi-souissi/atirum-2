import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
export class Dashboard extends Component {
	state = {
		description: "",
		aka: "",
		isAdding: false,
		track: { title, price }
	};

	handleProfileData = () => {
		axios
			.post("/user/profile/addProfile", {
				description: this.state.description,
				aka: this.state.aka,
				userId: this.props.match.params.id
			})
			.then(
				this.props.history.push(`/artistProfile/${this.props.match.params.id}`)
			);
	};

	render() {
		return (
			<div>
				<label>artist</label>
				<input onChange={e => this.setState({ aka: e.target.value })}></input>
				<label>description</label>
				<input
					onChange={e =>
						this.setState({ description: e.target.value })
					}></input>
				<button
					onClick={() => this.setState({ isAdding: !this.state.isAdding })}>
					Add track
				</button>
				{this.state.isAdding && (
					<div>
						<label>title</label>
						<input />
						<label>price</label>
						<input />
						<label>duration</label>
						<input />
						<button type='Upload'>upload</button>
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
