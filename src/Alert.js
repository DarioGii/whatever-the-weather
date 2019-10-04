import React, {Component} from 'react';
import $ from 'jquery';

export default class Alert extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.weatherAlert = React.createRef();
	// }

	render() {
		const { alertsData } = this.props;
		const alerts = {};

		alerts['advisory'] = 'info';
		alerts['watch'] = 'warning';
		alerts['warning'] = 'danger';

		if (!alertsData) {
			return (
				<div id="weatherAlert" className="alert alert-warning alert-dismissible fade show" role="alert">
					<strong>Holy guacamole!</strong> You should check in on some of those fields below.
					<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.dismissAlert.bind(this)}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			)
		} else {
			return null;
		}
	}

	dismissAlert() {
		console.log('Alert clicked!');

		let alert = $.getElementById('weatherAlert');

		$(alert).alert();
	}
}
