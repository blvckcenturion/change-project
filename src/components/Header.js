import { ReactComponent as Logo} from '../assets/images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import socials from '../utils/socials'
import {Link, NavLink, useNavigate, useLocation} from 'react-router-dom'
import Social from './Social';
import { use100vh } from 'react-div-100vh'

const Header = () => {
    let navigate = useNavigate();
    let {pathname} = useLocation();
    const [isOpen, setIsOpen] = useState(false)

    const onClickIcon = () => {
        setIsOpen(!isOpen)
    }

    const navigateToHomePage = (e) => {
        setIsOpen(false)
        pathname !== '/' && navigate('/');
    }

    return (
        <>
            <div className="header">
                <div onClick={navigateToHomePage}>
                    <Logo />
                    <h2>CHANGE PROJECT</h2>  
                </div>
                <div>
                    <FontAwesomeIcon icon={faPlus} className="icon" onClick={onClickIcon}/>
                </div>
            </div>
            {isOpen && <Navigation onClickIcon={ onClickIcon }/>}
        </>
    )
}

const Navigation = ({onClickIcon}) => {
    return (
        <nav className="navigation" style={{height: use100vh()}}>
            <div>
                <NavLink to="/hola" onClick={onClickIcon}>MY PROFILE</NavLink>
                <NavLink to="/hola" onClick ={onClickIcon}>START A NEW PETITION</NavLink>
                <NavLink to="/hola" onClick ={onClickIcon}>EXPLORE PETITIONS</NavLink>
            </div>
            <div>
                {socials.map((social, i) => <Social key={i} link={social.link} icon={social.icon}/>)}
            </div>
        </nav>
    )
}



export default Header