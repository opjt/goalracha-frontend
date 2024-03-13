import { Link } from 'react-router-dom';

const Topnav = () => {
  
    return (
        <div className="max-w-screen-xl mx-auto navbar bg-base-100 px-2 py-0 min-h-1">
            <div className="navbar flex font-normal text-lg p-0 min-h-1">
                <div className="font-bold">구장예약</div>
                <Link to="/board/list" className="ml-7">공지사항</Link>
            </div>
      </div>
    );
  }


export default Topnav;
