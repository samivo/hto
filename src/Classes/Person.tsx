import LocalData from "./LocalData";

export class Person {

    _id: string = "";
    name: string = "";
    ready_time: Date = new Date();
    comments: string = "";
    type: string = "";
    details: string[] = [];

    constructor(data?: Person) {

        if (data != undefined) {
            //Assign json to object
            Object.assign(this, data);

            //Make sure that ready_time is Date object
            this.ready_time = new Date(this.ready_time);
        }
        else {
            this.ready_time = new Date();
        }
        
    }
}

export function FetchAllPersons(): Promise<Person[]> {

    return new Promise((resolve, reject) => {

        //For mobile
        setTimeout(() => {
            reject("Verkkovirhe.");
        }, 5000);

        fetch(LocalData.backendUrl, {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "Application/Json" }
        }).then((response) => {

            if (!response.ok) {
                reject("Virhe. Koodi: " + response.status);
            }

            response.json().then((data: Person[]) => {

                const person: Person[] = [];

                //Loop trough json data
                data.forEach(item => {
                    person.push(new Person(item));
                });

                resolve(person);

            }).catch((err) => {

                console.log(err);
                reject("Virhe. Yritä uudelleen");
            })

        }).catch((err) => {

            console.log("fuck" + err);
            reject("Virhe. Yritä uudelleen.");
        });
    });
}


export function UpdatePerson(person: Person): Promise<string> {

    return new Promise((resolve, reject) => {

        //For mobile
        setTimeout(() => {
            reject("Verkkovirhe.");
        }, 5000);

        fetch(LocalData.backendUrl, {
            method: "PUT",
            mode: "cors",
            headers: { "Content-Type": "Application/Json" },
            body: JSON.stringify(person)
        }).then((response) => {

            if (!response.ok) {
                reject("Virhe. Koodi: " + response.status);
            }
            resolve("");
        }).catch((err) => {

            console.log(err);
            reject("Virhe. Yritä uudelleen.");
        });
    });
}

export function AddPerson(person: Person): Promise<string> {

    return new Promise((resolve, reject) => {

        //For mobile
        setTimeout(() => {
            reject("Verkkovirhe.");
        }, 5000);

        fetch(LocalData.backendUrl, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "Application/Json" },
            body: JSON.stringify(person)
        }).then((response) => {

            if (!response.ok) {
                reject("Virhe. Koodi: " + response.status);
            }
            resolve("");
        }).catch((err) => {

            console.log(err);
            reject("Virhe. Yritä uudelleen.");
        });
    });
}

export function DeletePerson(person: Person): Promise<string> {

    return new Promise((resolve, reject) => {

        //For mobile
        setTimeout(() => {
            reject("Verkkovirhe.");
        }, 5000);

        fetch(LocalData.backendUrl, {
            method: "DELETE",
            mode: "cors",
            headers: { "Content-Type": "Application/Json" },
            body: JSON.stringify(person)
        }).then((response) => {

            if (!response.ok) {
                reject("Virhe. Koodi: " + response.status);
            }
            resolve("");
        }).catch((err) => {

            console.log(err);
            reject("Virhe. Yritä uudelleen.");
        });
    });
}