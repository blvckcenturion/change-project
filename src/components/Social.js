import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Social = ({ link, icon }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="social">
            <FontAwesomeIcon icon={icon} className="icon" />
        </a>
    )
}

export default Social