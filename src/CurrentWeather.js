import React, {Component, Fragment} from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

export default class CurrentWeather extends Component {
	getHoursForToday(hourlyForecast) {
		let idx = 0;

		for (idx; idx < hourlyForecast.length; idx++) {
			let hour = new Date(hourlyForecast[idx].time * 1000).getHours();

			if (hour === 0) {
				return idx;
			}
		}

		return -1;
	}

	render() {
		const { onClick, onChange, onSubmit, place, weather } = this.props;
		const weatherProps = {};
		let card;
		let location;

		weatherProps['clear-day'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/clear_day.mp4',
			'icon': 'CLEAR_DAY',
			'credit': 'Photo by Pixabay from Pexels'
		};
		weatherProps['clear-night'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/clear_night.mp4',
			'icon': 'CLEAR_NIGHT',
			'credit': 'Photo by Min An from Pexels'
		};
		weatherProps['partly-cloudy-day'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/cloudy_day.mp4',
			'icon': 'PARTLY_CLOUDY_DAY',
			'credit': 'Photo by Sindre Strøm from Pexels'
		};
		weatherProps['partly-cloudy-night'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/cloudy_night.mp4',
			'icon': 'PARTLY_CLOUDY_NIGHT',
			'credit': 'Photo by Joonas kääriäinen from Pexels'
		};
		weatherProps['cloudy'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/cloudy_day.mp4',
			'icon': 'CLOUDY',
			'credit': 'Photo by Pixabay from Pexels'
		};
		weatherProps['rain'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/rain.mp4',
			'icon': 'RAIN',
			'credit': 'Photo by Pixabay from Pexels'
		};
		weatherProps['sleet'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/sleet.mp4',
			'icon': 'SLEET',
			'credit': 'Photo by Ekrulila from Pexels'
		};
		weatherProps['snow'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/snow.mp4',
			'icon': 'SNOW',
			'credit': 'Photo by Pixabay from Pexels'
		};
		weatherProps['wind'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/wind.mp4',
			'icon': 'WIND',
			'credit': 'Photo by Simon Matzinger from Pexels'
		};
		weatherProps['fog'] = {
			'video': 'https://whatever-the-weather.s3.eu-west-2.amazonaws.com/video/fog.mp4',
			'icon': 'FOG',
			'credit': 'Photo by Pixabay from Pexels'
		};

		if (weather) {
			const hourlySummary = weather.hourly;
			const hourlyForecast = weather.hourly.data.slice(0, this.getHoursForToday(weather.hourly.data));

			if (place) {
				location = place.results[0].address_components[0].long_name + ', ' + place.results[0].address_components[1].long_name;
			} else {
				location = weather.timezone;
			}

			card = (
				<Fragment>
					<video playsInline autoPlay muted loop width='100%'>
						<source src={weatherProps[weather.currently.icon].video} type="video/mp4"/>
					</video>
					<div className="card-img-overlay">
						<div className="card-body">
							<div className="row">
								<div className="col-lg-9"><h1 className="card-title display-1">{location}</h1></div>
								<div className="col-lg-3">
									<div className="input-group input-group-lg mb-3">
										<form onSubmit={onSubmit}>
											<div className="input-group-append">
												<input type="text" className="form-control" onChange={onChange} placeholder="Search"/>
												<button className="btn btn-dark" type="button" id="button-addon2" onClick={onClick}>Go</button>
											</div>
										</form>
									</div>
								</div>
							</div>
							<h2 className="card-title display-2">
								<ReactAnimatedWeather size={74} icon={weatherProps[weather.currently.icon].icon}
								                      animate={true} color="white"/>{weather.currently.temperature + '˚C'}
							</h2>
							<h3 className="card-subtitle mb-2">{weather.currently.summary}</h3>
							<p className="card-text">{'Feels like ' + weather.currently.apparentTemperature + '˚C'}</p>
							<br/>
							<br/>
							<br/>
							<div className="card bg-transparent text-center text-white" style={{border: 'none'}}>
								<h2 className="card-title display-3">Today</h2>
								<h1 className="card-title"><ReactAnimatedWeather icon={weatherProps[hourlySummary.icon].icon} size={72}
								                                                 color="white" animate={true}/></h1>
								<h6 className="card-subtitle display-4">{hourlySummary.summary}</h6>
							</div>
							<div className="card-group text-center">
								{hourlyForecast.map((val, idx) =>
									<div className="card bg-secondary" key={idx}>
										<div className="card-body">
											<p
												className="card-text text-info h5">{new Date(hourlyForecast[idx].time * 1000).toLocaleTimeString('en-GB', {
												hour: "numeric",
												minute: "numeric"
											})}</p>
											<p className="card-title"><ReactAnimatedWeather icon={weatherProps[hourlyForecast[idx].icon].icon}
											                                                size={36} color="white" animate={true}/></p>
											<strong className="card-text text-warning h5">{hourlyForecast[idx].temperature + '˚'}</strong>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</Fragment>
			)
		} else {
			card = <h1 className="text-black-50">Loading...</h1>
		}

		return (
			<div className="card text-white" style={{border: 'none'}}>
				{card}
			</div>
		)
	}
}
