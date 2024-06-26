// functions to calculate AQI from PM2.5 concentration      
		//var AQI = aqiFromPM(pm25[i][2]);
		//var AQIDescription = getAQIDescription(AQI); //A short description of the provided AQI
		//var AQIMessage = getAQIMessage(AQI); // What the provided AQI means (a longer description)
		// And here are the functions:

		function aqiFromPM(pm) {

			if (isNaN(pm)) return "-";
			if (pm == undefined) return "-";
			if (pm < 0) return pm;
			if (pm > 1000) return "-";

			if (pm > 350.5) {
				return calcAQI(pm, 500, 401, 500, 350.5);
			} else if (pm > 250.5) {
				return calcAQI(pm, 400, 301, 350.4, 250.5);
			} else if (pm > 150.5) {
				return calcAQI(pm, 300, 201, 250.4, 150.5);
			} else if (pm > 55.5) {
				return calcAQI(pm, 200, 151, 150.4, 55.5);
			} else if (pm > 35.5) {
				return calcAQI(pm, 150, 101, 55.4, 35.5);
			} else if (pm > 12.1) {
				return calcAQI(pm, 100, 51, 35.4, 12.1);
			} else if (pm >= 0) {
				return calcAQI(pm, 50, 0, 12, 0);
			} else {
				return undefined;
			}

		}

		function bplFromPM(pm) {
			if (isNaN(pm)) return 0;
			if (pm == undefined) return 0;
			if (pm < 0) return 0;

			if (pm > 350.5) {
				return 401;
			} else if (pm > 250.5) {
				return 301;
			} else if (pm > 150.5) {
				return 201;
			} else if (pm > 55.5) {
				return 151;
			} else if (pm > 35.5) {
				return 101;
			} else if (pm > 12.1) {
				return 51;
			} else if (pm >= 0) {
				return 0;
			} else {
				return 0;
			}

		}

		function bphFromPM(pm) {
			//return 0;
			if (isNaN(pm)) return 0;
			if (pm == undefined) return 0;
			if (pm < 0) return 0;

			if (pm > 350.5) {
				return 500;
			} else if (pm > 250.5) {
				return 500;
			} else if (pm > 150.5) {
				return 300;
			} else if (pm > 55.5) {
				return 200;
			} else if (pm > 35.5) {
				return 150;
			} else if (pm > 12.1) {
				return 100;
			} else if (pm >= 0) {
				return 50;
			} else {
				return 0;
			}

		}

		function calcAQI(Cp, Ih, Il, BPh, BPl) {

			var a = (Ih - Il);
			var b = (BPh - BPl);
			var c = (Cp - BPl);
			return Math.round((a / b) * c + Il);

		}


		function getAQIDescription(aqi) {
			if (aqi >= 401) {
				return 'Hazardous';
			} else if (aqi >= 301) {
				return 'Hazardous';
			} else if (aqi >= 201) {
				return 'Very Unhealthy';
			} else if (aqi >= 151) {
				return 'Unhealthy';
			} else if (aqi >= 101) {
				return 'Unhealthy for Sensitive Groups';
			} else if (aqi >= 51) {
				return 'Moderate';
			} else if (aqi >= 0) {
				return 'Good';
			} else {
				return undefined;
			}
		}

		function getAQIIconURL(aqi) {

			if (aqi >= 401) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (aqi >= 301) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (aqi >= 201) {
				return 'https://maps.google.com/mapfiles/kml/paddle/purple-circle.png';
			} else if (aqi >= 151) {
				return 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png';
			} else if (aqi >= 101) {
				return 'https://maps.google.com/mapfiles/kml/paddle/orange-circle.png';
			} else if (aqi >= 51) {
				return 'https://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
			} else if (aqi >= 0) {
				return 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
			} else {
				return undefined;
			}
		}

		function getAQIMessage(aqi) {
			if (aqi >= 401) {
				return '>401: Health alert: everyone may experience more serious health effects';
			} else if (aqi >= 301) {
				return '301-400: Health alert: everyone may experience more serious health effects';
			} else if (aqi >= 201) {
				return '201-300: Health warnings of emergency conditions. The entire population is more likely to be affected. ';
			} else if (aqi >= 151) {
				return '151-200: Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
			} else if (aqi >= 101) {
				return '101-150: Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
			} else if (aqi >= 51) {
				return '51-100: Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
			} else if (aqi >= 0) {
				return '0-50: Air quality is considered satisfactory, and air pollution poses little or no risk';
			} else {
				return undefined;
			}
		}

		// Set value, color of AQI gauge on Blynk gauge ////////
		function calcAQIValue() {
			var gaugeValue = airQualityIndex;
			var newColor;
			var newLabel;
			// assign color according to US AQI standard (modified per https://airnow.gov/index.cfm?action=aqibasics.aqi)

			if (gaugeValue > 300) {
				newColor = AQI_MAROON;
				newLabel = "AQI: HAZARDOUS";
			} else if (gaugeValue > 200) {
				newColor = AQI_PURPLE;
				newLabel = "AQI: VERY UNHEALTHY";
			} else if (gaugeValue > 150) {
				newColor = AQI_RED;
				newLabel = "AQI: UNHEALTHY";
			} else if (gaugeValue > 100) {
				newColor = AQI_ORANGE;
				newLabel = "AQI: UNHEALTHY FOR SOME";
			} else if (gaugeValue > 50) {
				newColor = AQI_YELLOW;
				newLabel = "AQI: MODERATE";
			} else {
				newColor = AQI_GREEN; //"Safe"
				newLabel = "AQI: GOOD";
			}
		}