import React, {Component, Fragment} from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

export default class CurrentWeather extends Component {
	getHoursForToday(hourlyForecast) {
		let idx = 0;

		for(idx; idx < hourlyForecast.length; idx++) {
			let hour = new Date(hourlyForecast[idx].time * 1000).getHours();

			if(hour === 0) {
				return idx;
			}
		}

		return -1;
	}

	render() {
		const { currentWeather } = this.props;
		const weatherProps = {};
		let card;

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

		if(currentWeather) {
			const hourlySummary = currentWeather.hourly;
			const hourlyForecast = currentWeather.hourly.data.slice(0, this.getHoursForToday(currentWeather.hourly.data));

			card = (
				<Fragment>
					<video playsInline autoPlay muted loop width='100%'>
						<source src={ weatherProps[currentWeather.currently.icon].video } type="video/mp4" />
					</video>
					<div className="card-img-overlay">
						<div className="card-body">
							<h1 className="card-title display-1">{ currentWeather.timezone }</h1>
							<h2 className="card-title display-2">
								<ReactAnimatedWeather size={74} icon={weatherProps[currentWeather.currently.icon].icon}
								                      animate={true} color="white"/>{ currentWeather.currently.temperature + '˚C' }
							</h2>
							<h3 className="card-subtitle mb-2">{ currentWeather.currently.summary }</h3>
							<p className="card-text">{ 'Feels like ' + currentWeather.currently.apparentTemperature + '˚C' }</p>
							<br />
							<br />
							<br />
							<div className="card bg-transparent text-center text-white" style={{ border: 'none' }}>
								<h2 className="card-title display-3">Today</h2>
								<h1 className="card-title"><ReactAnimatedWeather icon={ weatherProps[hourlySummary.icon].icon } size={72} color="white" animate={true} /></h1>
								<h6 className="card-subtitle display-4">{ hourlySummary.summary }</h6>
							</div>
							<div className="card-group text-center">
								{ hourlyForecast.map((val, idx) =>
									<div className="card border-light bg-transparent" key={idx}>
										<div className="card-body">
											<p className="card-text text-info">{ hourlyForecast[idx].temperature + '˚'}</p>
											<p className="card-title"><ReactAnimatedWeather icon={ weatherProps[hourlyForecast[idx].icon].icon } size={32} color="white" animate={true} /></p>
											<em className="card-text text-warning">{ new Date(hourlyForecast[idx].time * 1000).toLocaleTimeString() }</em>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</Fragment>
			)
		} else {
			card = <h1>Loading...</h1>
		}

		return (
			<div className="card text-white" style={{ border: 'none' }}>
				{ card }
			</div>
		)
	}
}
