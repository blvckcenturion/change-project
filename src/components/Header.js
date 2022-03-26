import { ReactComponent as Logo} from '../assets/images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import socials from '../utils/socials'
import {useNavigate, useLocation} from 'react-router-dom'
import Social from './Social';
import { use100vh } from 'react-div-100vh'

const Header = () => {
    let navigate = useNavigate();
    let {pathname} = useLocation();
    const [isOpen, setIsOpen] = useState(false)

    const onClickIcon = () => {
        setIsOpen(!isOpen)
    }

    const navigateTo = (path) => {
        setIsOpen(false)
        pathname !== path && navigate(path);
    }

    return (
        <>
            <div className="header">
                <div onClick={(e) => navigateTo('/')}>
                    <Logo />
                    <h2>CHANGE PROJECT</h2>  
                </div>
                <div>
                    <FontAwesomeIcon icon={faPlus} className="icon" onClick={onClickIcon}/>
                </div>
            </div>
            {isOpen && <Navigation setIsOpen={setIsOpen}/>}
        </>
    )
}

const Navigation = ({ setIsOpen }) => {
    let navigate = useNavigate();
    let { pathname } = useLocation();
    
    const navigateTo = (path) => {
        setIsOpen(false)
        pathname !== path && navigate(path);
    }

    return (
        <nav className="navigation" style={{height: use100vh()}}>
            <div>
                <h3 onClick={() => navigateTo('/my-profile')}>MY PROFILE</h3>
                <h3 onClick ={() => navigateTo('/new-petition')}>START A NEW PETITION</h3>
                <h3 onClick={() => navigateTo('/explore')}>EXPLORE PETITIONS</h3>
                <h3 onClick ={() => navigateTo('/register')}>SIGN UP</h3>
            </div>
            <div>
                {socials.map((social, i) => <Social key={i} link={social.link} icon={social.icon}/>)}
            </div>
        </nav>
    )
}



export default Header