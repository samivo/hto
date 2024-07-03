import './App.css'
import { useState, useEffect } from 'react';
import { Person, FetchAllPersons } from './Classes/Person';
import DateContainer from './components/DateContainer'
import PersonList from './components/PersonList';
import AddButton from './components/AddButton';
import Sunset from './components/Sunset';
import PersonModal from './components/PersonModal';
import InfoBox from './components/InfoBox';
import CheckNotams from './Classes/Notam';
import LocalData from './Classes/LocalData';
import Github from './components/Github';

function App() {

  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person>(new Person());
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [modalState, setModalState] = useState<boolean>(false);
  const [notamDates, setNotamDates] = useState<Date[]>([]);
  const [infoBoxState, setInfoBoxState] = useState({ visible: false, success: false, message: "" });

  //Runs once when page loads
  useEffect(() => {

    FetchData();

    CheckNotams().then((result) => {
      setNotamDates(result);
    }).catch((err) => {
      setInfoBoxState({ ...infoBoxState, visible: true, success: false, message: err });
    });

  }, []);

  const FetchData = () => {

    FetchAllPersons().then((response: Person[]) => {
      setPersons(response);
    }).catch((err) => {
      setInfoBoxState({ ...infoBoxState, visible: true, success: false, message: err });
    });
  }

  const HideModal = (success: boolean, message?: string) => {

    setModalState(false);

    if (success === true && message != undefined) {
      setInfoBoxState({ ...infoBoxState, visible: true, success: success, message: message });
      FetchData();
    }
    else if (success === false && message != undefined) {
      setInfoBoxState({ ...infoBoxState, visible: true, success: success, message: message });
      FetchData();
    }
  }

  const OpenPersonModal = (person?: Person) => {

    if (person == undefined) {
      //Create new person to add
      let tempPerson = new Person();
      tempPerson.ready_time = activeDate;

      setSelectedPerson(tempPerson);
      setModalState(true);
    }
    else {
      //Edit person
      setSelectedPerson(person);
      setModalState(true);
    }
  }

  function Notam() {

    //RWY CLSD start and end dates founded?
    if (notamDates.length >= 3) {
      return (
        <div className='Notam'>
          <a style={{ color: "red" }} href={LocalData.NotamUrl} target='_blank'>Notam!</a>
        </div>
      )
    }
    else {
      return (
        <div className='Notam'>
          <a style={{ color: "lightblue", textDecoration: "none" }} href={LocalData.NotamUrl} target='_blank'>Notam</a>
        </div>
      );
    }
  }

  return (
    <div className='App'>
      <InfoBox state={infoBoxState} setState={setInfoBoxState} />
      <DateContainer personList={persons} setActiveDate={setActiveDate} />

      <div className='InfoBar'>
        <Sunset date={activeDate} />
        <Notam />
        <AddButton handleClick={OpenPersonModal} />
      </div>

      <div style={{ height: window.innerHeight - 180 }} className='PersonList'>
        <PersonList personList={persons} activeDate={activeDate} handleClick={OpenPersonModal} />
      </div>

      <PersonModal person={selectedPerson} visibility={modalState} hideModal={(success, message) => { HideModal(success, message) }} />
      <Github />

    </div>
  )
}

export default App
