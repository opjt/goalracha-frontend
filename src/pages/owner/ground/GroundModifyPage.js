const { useParams } = require("react-router-dom")
import GroundModifyComponent from "../../../components/owner/ground/GroundModifyComponent";


const GroundModifyPage = () => {

    const {gno} = useParams()

    return (
        <div>
            <div> <GroundModifyComponent/></div>
        </div>
    )
}

export default GroundModifyPage