import './InfoBox.css'

interface Iprops {
    state: { visible: boolean, success: boolean, message: string };
    setState: React.Dispatch<React.SetStateAction<{ visible: boolean, success: boolean, message: string }>>;
}

function InfoBox({ state, setState }: Iprops) {

    let left = 0;
    let color = "lightgreen";

    if (state.visible) {
        left = 5;
        setTimeout(() => {
            setState({ ...state, visible: false });
        }, 3000);
    }
    else {
        left = -170;
    }

    if (state.success) {
        color = "lightgreen";
    }
    else {
        color = "lightcoral";
    }

    return (
        <div onClick={HandleInfoBoxClick} style={{ left: left, backgroundColor: color }} className="InfoBox" >
            <p>{state.message}</p>
        </div >

    )

    function HandleInfoBoxClick() {
        setState({ ...state, visible: false });
    }
}

export default InfoBox