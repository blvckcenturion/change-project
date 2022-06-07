import { RingLoader } from "react-spinners"

const Loader = () => {
    return(
        <div className="loader">
            <RingLoader color={"#FF0A27"} loading={true} size={200} />
            <h3>CARGANDO...</h3>
        </div>
    )
}

export default Loader