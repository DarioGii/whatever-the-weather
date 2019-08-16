import React, {Component, Fragment} from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

export default class WeatherData extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
			.catch(console.log)
	}

	componentDidMount(position) {
		this.getGeolocation();
	}

	render() {
		const {weather} = this.state;

		return (
			<Fragment>
				<div className="row">
					<CurrentWeather currentWeather={weather}/>
				</div>
				<div className="row">
					<div className="col-lg"><Forecast data={weather}/></div>
				</div>
			</Fragment>
		);
	}
}
