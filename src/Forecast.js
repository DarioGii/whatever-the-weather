import React, {Component, Fragment} from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

export default class Forecast extends Component {
	render() {
		const { data } = this.props;
		const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const weatherIcons = {};
		let dailyForecast;

		weatherIcons['clear-day'] = 'CLEAR_DAY';
		weatherIcons['clear-night'] = 'CLEAR_NIGHT';
		weatherIcons['partly-cloudy-day'] = 'PARTLY_CLOUDY_DAY';
		weatherIcons['partly-cloudy-night'] = 'PARTLY_CLOUDY_NIGHT';
		weatherIcons['cloudy'] = 'CLOUDY';
		weatherIcons['rain'] = 'RAIN';
		weatherIcons['sleet'] = 'SLEET';
		weatherIcons['snow'] = 'SNOW';
		weatherIcons['wind'] = 'WIND';
		weatherIcons['fog'] = 'FOG';

		if(data) {
			let forecastSummary = data.daily;
			let forecastData = data.daily.data.slice(1);

			dailyForecast = (
				<Fragment>
					<hr />
					<div className="card bg-secondary text-center text-white shadow-lg p-3 mb-5 rounded">
						<h3 className="card-title">7 days</h3>
						<h1 className="card-title"><ReactAnimatedWeather size={66} icon={ weatherIcons[forecastSummary.icon] } color="white" animate={true} /></h1>
						<h5 className="card-subtitle">{ forecastSummary.summary }</h5>
					</div>
					<div className="card-group">
						{ forecastData.map((val, idx) =>
							<div className="card border-light" key={idx}>
								<div className="card-body">
									<h3 className="card-title"><ReactAnimatedWeather size={40} icon={ weatherIcons[forecastData[idx].icon] } animate={true} /> { daysOfTheWeek[new Date(forecastData[idx].time * 1000).getDay()] }</h3>
									<p className="card-subtitle">{'High: ' + forecastData[idx].temperatureHigh + '˚ | Low: ' + forecastData[idx].temperatureLow + '˚'}</p>
									<em className="card-text">{ forecastData[idx].summary }</em>
								</div>
							</div>
						)}
					</div>
				</Fragment>
			)
		} else {
			dailyForecast = null
		}

		return dailyForecast;

	}
}

