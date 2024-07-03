
class DateButtonData {
    day: string = "";
    date: string = "";
    jumpers: number = 0;
    notamActive: boolean = false;

    constructor(day: string, date: string, jumpers: number, notamActive: boolean) {
        this.day = day;
        this.date = date;
        this.jumpers = jumpers;
        this.notamActive = notamActive;
    }
}

export default DateButtonData