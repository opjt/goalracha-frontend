import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserReserveListPage = () => {
    const [reservationList, setReservationList] = useState([]);

    useEffect(() => {
        // 예약 목록을 가져오는 함수를 정의합니다.
        const fetchReservationList = async () => {
            try {
                const response = await axios.get(`/v/list/${uNo}`); // uNo는 사용자 번호입니다.
                setReservationList(response.data);
            } catch (error) {
                console.error('Error fetching reservation list:', error);
            }
        };

        // 페이지가 로드될 때 예약 목록을 가져옵니다.
        fetchReservationList();
    }, []);

    return (
        <div>
            <h1>User Reservation List</h1>
            <ul>
                {reservationList.map((reservation, index) => (
                    <li key={index}>
                        <p>Ground Name: {reservation.groundName}</p>
                        <p>Ground Address: {reservation.groundAddr}</p>
                        <p>Reservation Date: {reservation.reservationDate}</p>
                        <p>Reservation Time: {reservation.reservationTime}</p>
                        <p>Reservation Create Date: {reservation.reservationCreateDate}</p>
                        <p>Price: {reservation.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserReserveListPage;
