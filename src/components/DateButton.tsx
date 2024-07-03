import './DateButton.css'
import exclamationSvg from '../assets/exclamation-mark.svg'
import personSvg from '../assets/person.svg'
import DateButtonData from '../Classes/DateButtonData'

interface Iprops {
    props: DateButtonData;
    isActive: boolean;
    onClick: () => void;
}

function DateButton({ props, isActive, onClick }: Iprops) {

    function Notam() {
        if (props.notamActive) {
            return (<img src={exclamationSvg} id='exclamation'></img>);
        }
        return null;
    }

    function JumperCount() {
        if (props.jumpers > 0) {
            return (
                <>
                    <p id='personCount'>{props.jumpers}</p>
                    <img src={personSvg} id='personSvg'></img>
                </>
            )
        }
        return null;
    }

    return (

        <div className="DateButton" style={{ borderColor: isActive ? 'blue' : 'lightblue', borderWidth: isActive ? 3 : 1 }} onClick={onClick}>
            <p id='day'>{props.day}</p>
            <p id='date'>{props.date}</p>
            <div className='personCount'>
                <Notam />
                <JumperCount />
            </div>
        </div>
    )
}

export default DateButton