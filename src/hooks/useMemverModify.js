import { useState, useEffect } from "react";
import axios from "axios";

const useMemberModify = (uNo) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/member/mypage/${uNo}`);
        if (!response.ok) {
          throw new Error("사용자 정보를 불러오지 못했습니다.");
        }
        const data = response.data;
        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserInfo();

    return () => {
      // 컴포넌트가 언마운트될 때 실행될 클린업 함수
      // 필요한 경우 사용
    };
  }, [uNo]); // uNo가 변경될 때마다 실행

  return { userInfo, loading, error };
};

export default useMemberModify;
