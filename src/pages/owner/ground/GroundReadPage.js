import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import GroundReadComponent from "../../../components/owner/ground/GroundReadComponent";


const GroundReadPage = () => {
    const {gno} = useParams()
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    console.log(gno)
    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

    const queryStr = createSearchParams({ page, size }).toString()

    const moveToModify = useCallback((gno) => {
        navigate({
            pathname: `owner/ground/modify/${gno}`,
            search: queryStr
        })
    }, [gno, page, size])

    const moveToList = useCallback(() => {
        navigate({
            pathname: `owner/ground`, search: queryStr
        }, [page, size])
    })

    return (
        <div className="font-extrabold w-full bg-white mt-6">
            구장조회 {gno}

            <div className="text-2xl">
                <GroundReadComponent gno={gno}></GroundReadComponent>

                <button onClick={() => moveToModify(gno)}>수정</button>
                <button onClick={() => moveToList()}>목록</button>

            </div>
        </div >
    )
}

export default GroundReadPage;