import React from "react";
import { useParams } from "react-router-dom";
import GroundReadComponent from "../../../components/owner/ground/GroundReadComponent";


const GroundReadPage = () => {
    const {gno} = useParams()


    return (
        <div>
            <div>
                <GroundReadComponent gno={gno}></GroundReadComponent>
            </div>
        </div>
    )
}

export default GroundReadPage;