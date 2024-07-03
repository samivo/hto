import './Sunset.css'
import sunsetSvg from '../assets/sunset.svg'
import nightSvg from '../assets/night.svg'
import LocalData from '../Classes/LocalData'

interface Iprops {
    date: Date;
}

function Sunset({ date }: Iprops) {

    //Target coordinates
    const lat = LocalData.dzCoordinatesLat;
    const long = LocalData.dzCoordinatesLong;

    //sunset -> The sun is just below the horizon, night -> 6 degrees below
    const sunset = CalculateSunsetTime(lat, long, date, false);
    const night = CalculateSunsetTime(lat, long, date, true);

    return (
        <div className='SunsetTimes'>
            <div className='Sunset'>
                <img src={sunsetSvg}></img>
                <p>{sunset}</p>
            </div>

            <div className='Sunset'>
                <img src={nightSvg}></img>
                <p>{night}</p>
            </div>

        </div>

    )
}

function CalculateSunsetTime(lat: number, long: number, date: Date, dusk: boolean): string {

    //https://www.omnicalculator.com/physics/sunset

    //90.833 degrees is about atmospheric refraction. Use 90 degrees for uncorrected time
    let horizonAngle = 90.833;
    let dayOfYear = 0;
    let timeZone = (date.getTimezoneOffset() / 60) * -1; // Sets local timezone exmaple +3 in Finland at summer

    //Gets the time when sun goes 6 degrees below the horizon
    if (dusk === true) {
        horizonAngle = 96;
    }

    const tempDate = new Date(date.getFullYear(), 0, 0);

    dayOfYear = Math.floor((date.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));

    const t = dayOfYear + ((18 - (lat / 15)) / 24);

    const M = 0.9856 * t - 3.289;

    let L = M + 1.916 * Math.sin(M * Math.PI / 180) + 0.02 * Math.sin(2 * M * Math.PI / 180) + 282.634;
    L = L % 360;

    let RA = Math.atan(0.91764 * Math.tan(L * Math.PI / 180)) * 180 / Math.PI;
    RA = (RA + 360) % 360;

    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;

    RA = RA + (Lquadrant - RAquadrant);
    RA = RA / 15;

    const declination = Math.asin(0.39872 * Math.sin(L * Math.PI / 180)) * 180 / Math.PI;

    const ha = Math.acos((Math.cos((Math.PI / 180) * horizonAngle) - Math.sin(declination * Math.PI / 180) * Math.sin(lat * Math.PI / 180)) / (Math.cos(declination * Math.PI / 180) * Math.cos(lat * Math.PI / 180))) * 180 / Math.PI;

    const T = ha / 15 + RA - (0.06571 * t) - 6.622;
    const Tsunset = T - (long / 15) + timeZone;

    const decimalTime = (Tsunset + 24) % 24;
    const hours = Math.floor(decimalTime);
    const minutes = (decimalTime - hours) * 60;
    const intMinutes = Math.floor(minutes);

    let retHours: string = hours.toString();
    let retMinutes: string = intMinutes.toString();

    if (hours < 10) {
        retHours = "0" + hours
    }

    if (minutes < 10) {
        retMinutes = "0" + intMinutes
    }

    //The sun does not go below 6 degrees below the horizon?
    if (isNaN(hours)) {
        return "--:--";
    }

    return retHours + ":" + retMinutes;

}

export default Sunset