import React from "react";
import GroundModifyComponent from "components/owner/ground/GroundModifyComponent";
import { useParams } from "react-router-dom";

const GroundModifyPage = () => {
  const { gno } = useParams();

  return (
    <div>
      <div>
        <GroundModifyComponent gno={gno} />
      </div>
    </div>
  );
};

export default GroundModifyPage;
