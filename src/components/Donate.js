import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

export class Donate extends Component {
	state = {
		sum: 0,
		donations: 0,
		title: "",
		price: 0
	};
	componentDidMount() {
		axios
			.get(`/user/artist/getTrackBy/${this.props.match.params.id}`)
			.then(res =>
				this.setState({
					donations: res.data[0].donations,
					title: res.data[0].title,
					price: res.data[0].price
				})
			);
	}
	handleDonate = () => {
		axios
			.put(`/user/artist/editTrack/${this.props.match.params.id}`, {
				donations: Number(this.state.sum) + this.state.donations
			})
			.then(res => {
				this.setState({ donations: res.data.donations });
				this.props.update();
				alert("donation sended");
				this.props.history.push("/");
			});
	};
	render() {
		return (
			<div className='donate'>
				<p className='title-tracks'>Donate:</p>
				<div>Track title: {this.state.title}</div>
				<div>Price: {this.state.price}D</div>
				<div>Total donations: {this.state.donations}D</div>
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
