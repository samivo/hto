import './Github.css'
import GithubMark from '../assets/github-mark.png'


function Github() {


    return (
        <div className='Git'>
            <img onClick={HandleClick} src={GithubMark} />
            <p onClick={HandleClick}>Samivo/hto</p>
        </div>

    )

    function HandleClick(){
        window.open("https://github.com/samivo/hto");
    }
}

export default Github