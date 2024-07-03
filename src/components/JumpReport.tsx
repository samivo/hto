import './JumpReport.css'
import LocalData from '../Classes/LocalData';

interface Iprops {
    visible: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

function JumpReport({ visible, setVisibility }: Iprops) {

    //Sends email to backend service that fetch jump statics from manifest program

    if (visible) {
        return (
            <div className='ReportModal' onClick={HandleOverlayClick}>

                <div className='ReportModalWindow'>

                    <div className='ModalInput'>
                        <h3>Hae omat hypyt</h3>
                    </div>

                    <div className='ModalInput'>
                        <p>Sähköpostin täytyy olla sama kuin Skywin ohjelmassa.</p>
                    </div>

                    <form onSubmit={HandleSubmitButton}>

                        <div className='ModalInput'>
                            <input id='ReportEmail' required type='email' placeholder='Sähköposti' name='email' />
                        </div>

                        <div className='ModalInput'>
                            <button type='submit' className='SubmitEmailButton'>Hae</button>
                            <button onClick={HandleOverlayClick} className='CancelEmailButton'>Peruuta</button>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
    else {
        return null;
    }

    function HandleSubmitButton(e: any) {
        const formData = new FormData(e.target);
        e.preventDefault();

        formData.forEach((value, key) => {
            if (key === "email") {
                PostEmail(value.toString());
            }
        });

        setVisibility(false);
    }

    //Hide modal when clicking gray area or close button
    function HandleOverlayClick(e: any) {
        if (e.target === e.currentTarget) {
            setVisibility(false);
        }
    }

    function PostEmail(email: string) {

        const object = {
            email: email
        }

        fetch(LocalData.backendSkywinUrl, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "Application/Json" },
            body: JSON.stringify(object)
        }).then((response) => {

            if (!response.ok) {
                alert("Jotain meni pieleen.");
            }
        }).catch((err) => {

            console.log("fuck" + err);
            alert("Jotain meni pieleen.");
        });
    }
}

export default JumpReport