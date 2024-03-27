import { Link, useNavigate, useLocation, } from "react-router-dom";
import { useState ,useEffect} from "react";
import { update } from "slices/searchSlice";
import { useDispatch } from "react-redux";
import useCustomLogin from "hooks/useCustomLogin";

const MainHeader = ({ children }) => {
	const [searchInput, setSearchInput] = useState(""); // 입력된 값의 상태
	const dispatch = useDispatch();
  	const navigate = useNavigate();
	const location = useLocation();
	const { loginState, isLogin,moveToPath } = useCustomLogin();
	
	//유저아이콘클릭시 이동주소
	var myPageUrl = "/user/mypage";
	if(loginState.type && loginState.type != '') {
		myPageUrl = `/${loginState.type}/mypage`
		if(loginState.type=="ADMIN") {
			myPageUrl = '/adminPage'
		}
	} 

	useEffect(() => {
        if(isLogin) {
            if(loginState.email === loginState.nickname) {
               moveToPath("/user/join")
            }
       }
    })
	

	return (
		<div className="max-w-screen-xl mx-auto navbar bg-base-100 p-2 ">
		<div className="flex-1 h-16">
			<Link to={"/"} className="btn btn-ghost text-xl p-0">
			<img src="/goalracha_logo.png" alt="골라차" className="h-14" />
			</Link>
		</div>
		<div className="flex-none gap-2">
			<Link to={myPageUrl}>
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar"
			>
				<div className="w-10 rounded-full">
				<img alt="Tailwind CSS Navbar component" src="/img/user.png" />
				</div>
			</div>
			</Link>

			{/* <div className="dropdown dropdown-end"> 드롭다운버전
				<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar"
				>
				<div className="w-10 rounded-full">
					<img
					alt="Tailwind CSS Navbar component" 
					src="/img/user.png"
					/>
				</div>              
				</div>
				<ul
				tabIndex={0}
				className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
				>
				<li>
					<a className="justify-between">
					Profile
					<span className="badge">New</span>
					</a>
				</li>
				<li>
					<a>Settings</a>
				</li>
				<li>
					<a>Logout</a>
				</li>
				</ul>
			</div> */}
		</div>
		</div>
	);
};

export default MainHeader;
