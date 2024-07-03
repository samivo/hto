import './PersonList.css'
import { Person } from "../Classes/Person";
import LocalData from '../Classes/LocalData';

interface PersonListProps {
    personList: Person[];
    activeDate: Date;
    handleClick: (person: Person) => void;
}

function PersonList({ personList, activeDate, handleClick }: PersonListProps) {

    const activeDatePersonList: Person[] = [];
    const tables: any[] = [];

    const RowClick = (person: Person) => {
        handleClick(person);
    }

    //List persons for selected date
    personList.forEach(person => {
        if (person.ready_time.toDateString() === activeDate.toDateString()) {
            activeDatePersonList.push(person);
        }
    });

    if (activeDatePersonList.length === 0) {
        return null;
    }

    //Sort by time ascending
    activeDatePersonList.sort((a, b): number => {

        if (a.ready_time > b.ready_time) {
            return 1;
        }
        return -1;
    });

    let firstTable: boolean = true;

    //Sort by type and generate tables
    LocalData.personTypes.forEach(type => {

        const rows: any = [];
        activeDatePersonList.forEach(person => {

            if (person.type === type) {
                rows.push(Row(person));
            }
        });

        //Skip table if no rows
        if (rows.length > 0) {
            tables.push(Table(type, firstTable, rows));
            firstTable = false;
        }
    });

    return (
        <>
            {tables}
        </>
    )

    function Table(type: string, firstTable: boolean, rows: []) {
        return (
            <div className="personList" key={Math.random()}>
                <table className='personTable'>
                    <thead>
                        <tr>
                            <th colSpan={2} style={{ textAlign: "center" }}>{firstTable ? "Valmis" : ""}</th>
                            <th colSpan={3}>{type}</th>
                            <th colSpan={6}>{firstTable ? "Lisätiedot" : ""}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>
        )
    }

    function Row(person: Person) {
        return (
            <tr className='DataRow' key={Math.random()} onClick={() => RowClick(person)}>
                <td colSpan={2} style={{ textAlign: "center" }}>{ParseReadyTime(person)}</td>
                <td colSpan={3}>{person.name}</td>
                <td colSpan={6}>{ParseDetails(person)} {person.comments}</td>
            </tr >
        )
    }

    function ParseDetails(person: Person): string {

        let details = "";

        if (person.details.length > 0) {

            person.details.forEach(detail => {

                if (person.details.length > 1) {
                    details += detail + ", "
                }
                else {
                    details += detail + "."
                }

            });

            //If multiple details, remove last ", " and replace it with "."
            if (person.details.length > 1) {
                details = details.substring(0, details.length - 2) + ".";
            }
        }
        return details;
    }

    function ParseReadyTime(person: Person): string {

        let parsedTime = person.ready_time.toTimeString().substring(0, 5);

        //00:00 is no time set
        if (parsedTime === "00:00") {
            return "";
        }

        return parsedTime;
    }
}

export default PersonList