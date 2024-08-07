import LocalData from "./LocalData";

function CheckNotams(): Promise<Date[]> {

    return new Promise((resolve, reject) => {

        fetch(LocalData.backendNotamUrl, {
            headers: {
                "Content-Type": "text/html"
            }, mode: "cors"
        }).then((response) => {

            if (!response.ok) {
                reject("Notamien haku epäonnistui");
            }

            response.text().then((data) => {

                //Gets EFKU section
                const efkuStartIndex = data.indexOf(LocalData.notamStartIndex);
                const efkuEndIndex = data.indexOf(LocalData.notamEndIndex);

                let notam = data.substring(efkuStartIndex, efkuEndIndex);

                //Test data
                /*
                efkuNotams = `asdasd asd 34r asd ;: ?! 
                          RWY15/33 CLSD, WIP
    
                          FROM: 15JUN24 1500 TO: 17JUN24 2130 (B1064/24)
    
                          SCHEDULE: MAY 20-23 1500-2130`;
                */

                //Match RWYxx/xx CLSD and parses start and end dates to gourp 1 and 2
                const dates: RegExpMatchArray | null = notam.match(/RWY[\s\S]{0,10}CLSD[\s\S]*?FROM:[\s\S]{1}([\s\S]{12})[\s\S]*?TO:[\s\S]{1}([\s\S]{12})/i);

                if (dates != null) {

                    let datesArray: Date[] = [];

                    dates.forEach((data) => {
                        datesArray.push(GetDateFromNotam(data));
                    });

                    resolve(datesArray);
                }
                else {
                    resolve([]);
                }
            });
        }).catch(() => {
            reject("Notamien haku epäonnistui");
        });
    });

}

function GetDateFromNotam(dateStr: String): Date {

    //Make Date object from notam format "20MAY24 1500"

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const day = parseInt(dateStr.slice(0, 2), 10);
    const month = dateStr.slice(2, 5).toUpperCase();
    const year = 2000 + parseInt(dateStr.slice(5, 7), 10);
    const hours = parseInt(dateStr.slice(8, 10), 10);
    const minutes = parseInt(dateStr.slice(10, 12), 10);

    const monthIndex = months.indexOf(month);

    return new Date(Date.UTC(year, monthIndex, day, hours, minutes));
}

export default CheckNotams