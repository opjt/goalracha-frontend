import { NavLink } from 'react-router-dom';

const topnavowner = () => {

    return (
        <div className="max-w-screen-xl mx-auto navbar bg-base-100 px-2 py-0 min-h-1">
            <div className="navbar flex font-normal text-lg p-0 min-h-1">
                <NavLink
                    to="/owner/ground"
                    className={({ isActive }) =>
                        isActive ? "font-bold" : ""
                    }
                >
                    구장관리
                </NavLink>
                <NavLink
                    to="/owner/reserve/list"
                    className={({ isActive }) =>
                        isActive ? "font-bold ml-5" : "ml-5"
                    }
                >
                    예약관리
                </NavLink>
                <NavLink
                    to="/owner/notice"
                    className={({ isActive }) =>
                        isActive ? "font-bold ml-5" : "ml-5"
                    }
                >
                    공지사항
                </NavLink>
                <NavLink
                    to="/owner/statistics"
                    className={({ isActive }) =>
                        isActive ? "font-bold ml-5" : "ml-5"
                    }
                >
                    통계관리
                </NavLink>
            </div>
        </div>
    );
}


export default topnavowner;
