import socials from "../utils/socials"
import Social from "./Social"

const Footer = () => {
    return (
        <div className="footer">
            <footer>
                <div>
                    {socials.map((social, i) => <Social key={i} link={social.link} icon={social.icon}/>)}
                </div>
                <div>
                    <h2>CHANGE PROJECT</h2>
                </div>
            </footer>
        </div>
    )
}

export default Footer