import './AddButton.css'
import addSvg from '../assets/add.svg'
import reportSvg from '../assets/report.svg'
import JumpReport from './JumpReport'
import { useState } from 'react';

interface Iprops {
    handleClick: () => void;
}

function AddButton({ handleClick }: Iprops) {

    const [jumpReportVisible, SetJumpReportVisible] = useState(false);

    function HandleAddClick() {
        handleClick();
    }
    function HandleReportClick() {
        SetJumpReportVisible(true);
    }

    return (
        <div className='EditButtons'>
            <img onClick={HandleReportClick} src={reportSvg} className='ReportButton' />
            <img onClick={HandleAddClick} src={addSvg} className='AddButton' />
            <JumpReport visible={jumpReportVisible} setVisibility={SetJumpReportVisible} />
        </div>


    )
}

export default AddButton