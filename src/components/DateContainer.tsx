import './DateContainer.css'
import DateButton from './DateButton'
import DateButtonData from '../Classes/DateButtonData';
import { Person } from '../Classes/Person';
import { useState, useEffect } from 'react';

const weekDays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

interface allPersonsProps {
    personList: Person[];
    setActiveDate: React.Dispatch<React.SetStateAction<Date>>;
}

function DateContainer({ personList, setActiveDate }: allPersonsProps) {

    const [activeButtonIndex, setActiveButtonIndex] = useState(0);


    //Activate current date button when page loads
    useEffect(() => {
        setActiveButtonIndex(GetCurrentDayNumber());
    }, []);


    //When activeButtonIndex changes, set active date to parent component
    useEffect(() => {
        setActiveDate(GetAdjustedDate(activeButtonIndex));
    }, [activeButtonIndex]);

    const handleClick = (index: number) => {
        setActiveButtonIndex(index);
    };

    const DateButtons = [];

    for (let i = 0; i < 7; i++) {

        const props = new DateButtonData(weekDays[i], GetShortDate(GetAdjustedDate(i)), GetPersonCountByDate(personList, GetAdjustedDate(i)), false);

        DateButtons.push(
            <DateButton
                key={i}
                isActive={activeButtonIndex === i}
                onClick={() => handleClick(i)}
                props={props}
            />
        );
    }

    return (
        <div className="DateContainer">
            {DateButtons}
        </div>
    )

}

function GetAdjustedDate(loopIndex: number): Date {

    let date = new Date();

    //Get current day number 0-6
    let currentDateIndex = (date.getDay() + 6) % 7

    //Calculate correct dates to weekdays. Monday is index 0. Use currentDateIndex + 6 for Sunday index 0
    date.setDate(date.getDate() + (loopIndex - currentDateIndex + 7) % 7);

    return date;
}

function GetShortDate(date: Date): string {

    return date.getDate() + "." + (date.getMonth() + 1);
}

function GetPersonCountByDate(persons: Person[], date: Date): number {

    let count = 0;
    let compareDate = new Date();

    compareDate.setDate(date.getDate() + 1);

    persons.forEach(person => {

        if (person.ready_time.getDate() === date.getDate()) {
            count++
        }
    });

    return count
}

function GetCurrentDayNumber(): number {

    const currentDate = new Date();
    //Converts default Sunday -> 0 to Monday -> 0
    return ((currentDate.getDay() - 1) % 7);
}

export default DateContainer