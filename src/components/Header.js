import { ReactComponent as Logo} from '../assets/images/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const onClickIcon = () => {
        console.log('sapo');
    }
  return (
    <div className="header">
        <div>
            <Logo />
            <h2>CHANGE PROJECT</h2>  
        </div>
        <div>
            <FontAwesomeIcon icon={faPlus} className="icon" onClick={onClickIcon}/>
        </div>
    </div>
  )
}

export default Header