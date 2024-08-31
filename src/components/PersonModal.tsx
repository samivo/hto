import { useState } from 'react';
import { AddPerson, Person, UpdatePerson, DeletePerson } from '../Classes/Person';
import '../components/PersonModal.css'
import trashSvg from '../assets/trash.svg'
import LocalData from '../Classes/LocalData';


interface Iprops {
    visibility: boolean;
    hideModal: (success: boolean, message?: string) => void;
    person: Person;
}

function PersonModal({ visibility, hideModal: hideModal, person }: Iprops) {

    if (!visibility) {
        return null;
    }

    const typeList: string[] = LocalData.personTypes;
    const typeListHtml: any[] = [];

    const detailListHtml: any[] = [];
    const levelsHtml: any[] = [];

    const [selectedPersonType, setSelectedPersonType] = useState(person.type);

    typeList.forEach(type => {
        typeListHtml.push(<option key={Math.random()} value={type}>{type}</option>);
    });

    function HandleSubmitButton(e: any) {

        e.preventDefault();
        ApplyFormDataToPerson(person, new FormData(e.target));

        //Creates new perosn in no id
        if (person._id === "") {

            AddPerson(person).then(() => {

                hideModal(true, person.name + " lisätty.");
            }).catch((err) => {

                hideModal(false, err);
            });
        }
        else {
            UpdatePerson(person).then(() => {

                hideModal(true, person.name + " päivitetty.");
            }).catch((err) => {

                hideModal(false, err);
            });
        }
    }

    //Hide modal when clicking gray area
    function HandleOverlayClick(e: any) {
        if (e.target === e.currentTarget) {
            hideModal(false);
        }
    }

    function HandleDeleteButtonClick() {

        DeletePerson(person).then(() => {
            hideModal(true, person.name + " poistettu.");
        }).catch((err) => {
            hideModal(false, err);
        });
    }

    function RenderLevelsAndDetails() {

        if (selectedPersonType == typeList[1]) {

            LocalData.staticLeveles.forEach((level, index) => {
                levelsHtml.push(<option key={Math.random()} value={level}>{(index + 1) + " " + level}</option>);
            });

            return (
                <div className='ModalInput'>
                    <select defaultValue={person.details[0]} style={{ marginLeft: '40px' }} name="details" className='Input' >
                        {levelsHtml}
                    </select>
                </div>
            )
        }
        else if (selectedPersonType == typeList[2]) {

            LocalData.affLevels.forEach((level, index) => {
                levelsHtml.push(<option key={Math.random()} value={level}>{(index + 1) + " " + level}</option>);
            });

            return (
                <div className='ModalInput'>
                    <select defaultValue={person.details[0]} style={{ marginLeft: '40px' }} name="details" className='Input' >
                        {levelsHtml}
                    </select>
                </div>
            )
        }
        else if (selectedPersonType == typeList[0]) {

            LocalData.JumperDetails.forEach(detail => {
                const checked = person.details.includes(detail);
                detailListHtml.push(<label key={Math.random()}><input key={Math.random()} name={"details"} defaultChecked={checked} type='checkbox' value={detail} />{detail}</label>);
            });

            return (
                <div className='ModalTypes'>
                    {detailListHtml}
                </div>
            );
        }
        else {
            return null;
        }
    }


    return (
        <>
            <div className='Modal' onClick={HandleOverlayClick}>
                <div className='ModalWindow'>
                    <div className='PersonModal'>
                        <form onSubmit={HandleSubmitButton}>

                            <div className='ModalInput'>
                                <label className='Label'>Nimi</label>
                                <input className='Input' name='name' defaultValue={person?.name} required />
                            </div>

                            <div className='ModalInput'>
                                <label className='Label'>Päivä</label>
                                <input className='Input' type='date' name='date' defaultValue={DateToInputForm()} />
                            </div>

                            <div className='ModalInput'>
                                <label className='Label'>Klo</label>
                                <input style={{ textAlign: 'center' }} className='Input' name='time' type='time' defaultValue={TimeToInputForm()} />
                            </div>

                            <div style={{ height: '50px' }} className='ModalInput'>
                                <label className='Label'>Info</label>
                                <textarea style={{ height: '40px', resize: 'none' }} name='comments' className='Input' defaultValue={person.comments} />
                            </div>

                            <div className='ModalInput'>
                                <select onChange={(e) => { setSelectedPersonType(e.target.value) }} value={selectedPersonType} style={{ marginLeft: '40px' }} name="type" required className='Input' >
                                    <option value={""} disabled hidden>Olen</option>
                                    {typeListHtml}
                                </select>
                            </div>

                            <RenderLevelsAndDetails />

                            <div className='ModalInput' id='ModalButtons'>
                                <button type='submit' className='ModalButtons' id='SubmitButton'> Tallenna</button>
                                <button onClick={() => { hideModal(false) }} className='ModalButtons' id='CancelButton'> Sulje</button>
                            </div>
                        </form>

                    </div >
                    <DeleteButton />
                </div >
            </div >
        </>

    )

    function DeleteButton() {

        //Render delete button when editing existing person
        if (person._id != "") {
            return (
                <img onClick={HandleDeleteButtonClick} className='TrashImage' src={trashSvg}></img>
            )
        }
        else {
            return null;
        }
    }

    function DateToInputForm() {
        //Adjust correct date with timezone
        let tempDate = new Date(person.ready_time);
        const minute = 60000;//ms
        tempDate.setTime(tempDate.getTime() - (tempDate.getTimezoneOffset() * minute));

        return tempDate.toISOString().substring(0, 10);
    }

    function TimeToInputForm() {
        return person.ready_time.toTimeString().substring(0, 5);
    }

    function ApplyFormDataToPerson(targetPerson: Person, formData: FormData) {

        let date = new Date();
        let details: string[] = [];

        //Pust details to array
        formData.forEach((value, key) => {
            if (key == "details") {
                details.push(value.toString());
            }
            else if (key == "name") {
                targetPerson.name = value.toString();
            }
            else if (key == "date") {

                //Prevents date overflow when setting month. If current date is 31 and next month has 30 days, month overflows -> outcome is wanted month +1
                date.setDate(1);

                date.setFullYear(Number(value.toString().substring(0, 4)));
                date.setMonth(Number(value.toString().substring(5, 7)) - 1);
                date.setDate(Number(value.toString().substring(8, 10)));

            }
            else if (key == "time") {

                date.setHours(Number(value.toString().substring(0, 2)));
                date.setMinutes(Number(value.toString().substring(3, 5)));

            }
            else if (key == "type") {
                targetPerson.type = value.toString();
            }
            else if (key == "comments") {
                targetPerson.comments = value.toString();
            }
        });

        targetPerson.ready_time = date;
        targetPerson.details = details;
    }
}

export default PersonModal