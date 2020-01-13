import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

export class Donate extends Component {
	state = {
		sum: 0,
		donations: 0
	};
	componentDidMount() {
		axios
			.get(`/user/artist/getTrackBy/${this.props.match.params.id}`)
			.then(res => this.setState({ donations: res.data[0].donations }));
	}
	handleDonate = () => {
		axios
			.put(`/user/artist/editTrack/${this.props.match.params.id}`, {
				donations: Number(this.state.sum) + this.state.donations
			})
			.then(res => {
				this.setState({ donations: res.data.donations });
				alert("donation sended");
				this.props.update();
			});
	};
	render() {
		return (
			<div className='donate'>
				<p className='title-tracks'>Donate:</p>
				{/* <label>enter your donation in TND</label> */}
				<div>Total donations:{this.state.donations}</div>
				<input
					type='text'
					className='donate-input'
					onChange={e => this.setState({ sum: e.target.value })}></input>
				<button onClick={this.handleDonate}>Donate</button>
			</div>
		);
	}
}

export default withRouter(Donate);
