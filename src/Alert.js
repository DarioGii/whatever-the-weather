import React, {Component} from 'react';

export default class Alert extends Component {
	render() {
		const { alertData } = this.props;
		const alerts = {};

		alerts['advisory'] = 'info';
		alerts['watch'] = 'warning';
		alerts['warning'] = 'danger';

		if (alertData) {
			return (
				<div className="alert alert-warning alert-dismissible fade show" role="alert">
					<strong>Holy guacamole!</strong> You should check in on some of those fields below.
					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			)
		} else {
			return null;
		}
	}
}
