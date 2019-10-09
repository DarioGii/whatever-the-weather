import React, {Component, Fragment} from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

export default class WeatherData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			place: null,
			weather: null,
			inputText: ''
		};

		this.getCurrentWeatherData = this.getCurrentWeatherData.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onClick = (e) => {
		e.preventDefault();
		console.log(this.state.inputText);

		this.getDetailsForInput(this.state.inputText);

		this.setState({
			inputText: '',
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.inputText);

		this.getDetailsForInput(this.state.inputText);

		this.setState({
			value: '',
		});

		e.target.reset();
	};

	onChange = (e) => {
		this.setState({
			inputText: e.target.value
		});
	};

	getCurrentGeolocation() {
		const defaultLocation = '51.5074,0.1278';
		const location = navigator.geolocation;

		if (location) {
			location.getCurrentPosition(this.getCurrentWeatherData);
			return location.getCurrentPosition(this.getCurrentPlace);
		} else {
			return defaultLocation;
		}
	}

	getCurrentWeatherData(position) {
		fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0ddc527bd121b8f2f16e3e83a11791a6/' + position.coords.latitude + ',' + position.coords.longitude + '?units=si&exclude=minutely,flags')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					weather: data
				});
			})
			.catch(console.log);
	}

	getCurrentPlace(position) {
		fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyA_g_axntOBeFg_egmLNvwHFaSyjtXjSaA')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					place: data
				})
			})
			.catch(console.log);
	}

	getDetailsForInput(place) {
		fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + place + '&key=AIzaSyA_g_axntOBeFg_egmLNvwHFaSyjtXjSaA')
			.then(res => res.json())
			.then((data) => {
				console.log('data:' + data);
				this.setState({
					place: data
				})
			})
			.catch(console.log);

		console.log('state.place:' + this.state.place);
		// this.getWeatherForInput();
	}

	getWeatherForInput() {
		let lat = this.state.place.geometry.location.lat;
		let lng = this.state.place.geometry.location.lng;

		fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0ddc527bd121b8f2f16e3e83a11791a6/' + lat + ',' + lng + '?units=si&exclude=minutely,flags')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					weather: data
				});
			})
			.catch(console.log);
	}

	componentDidMount() {
		this.getCurrentGeolocation();
	}

	render() {
		const { place, weather } = this.state;

		return (
			<Fragment>
				<div className="row">
					<CurrentWeather onClick={this.onClick} onChange={this.onChange} onSubmit={this.onSubmit} place={place} weather={weather}/>
				</div>
				<div className="row">
					<div className="col-lg"><Forecast data={weather}/></div>
				</div>
				{/*<div className="row">*/}
				{/*	<div className="col-lg"><Alert alertsData={weather}/></div>*/}
				{/*</div>*/}
			</Fragment>
		);
	}
}
