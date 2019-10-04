import React, {Component, Fragment} from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Alert from './Alert';

export default class WeatherData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			place: null,
			weather: null
		};

		this.getWeatherData = this.getWeatherData.bind(this);
	}

	getGeolocation() {
		const defaultLocation = '51.5074,0.1278';
		const location = navigator.geolocation;

		if (location) {
			return location.getCurrentPosition(this.getWeatherData);
		} else {
			return defaultLocation;
		}
	}

	getWeatherData(position) {
		fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0ddc527bd121b8f2f16e3e83a11791a6/' + position.coords.latitude + ',' + position.coords.longitude + '?units=si&exclude=minutely,flags')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					weather: data
				});
			})
			.catch(console.log);

		fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyA_g_axntOBeFg_egmLNvwHFaSyjtXjSaA')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					place: data
				})
			})
			.catch(console.log);
	}

	componentDidMount(position) {
		this.getGeolocation();
	}

	render() {
		const { place, weather } = this.state;

		return (
			<Fragment>
				<div className="row">
					<CurrentWeather currentLocation={place} currentWeather={weather}/>
				</div>
				<div className="row">
					<div className="col-lg"><Forecast data={weather}/></div>
				</div>
				<div className="row">
					<div className="col-lg"><Alert alertsData={weather}/></div>
				</div>
			</Fragment>
		);
	}
}
