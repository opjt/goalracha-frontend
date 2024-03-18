import { useEffect,useState } from "react";
const { kakao } = window;


const KakaoMap = (state) => {
    const [maploc,setMapLoc] = useState(null);
    var mapOption = {
      center: new kakao.maps.LatLng(0,0), // 지도의 중심좌표
      level: 4 // 지도의 확대 레벨
  };  
    useEffect(()=>{
      const container = document.getElementById('map');
      var map = new kakao.maps.Map(container,mapOption);
      
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(state.addr, function(result, status) {
         if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            setMapLoc({x:result[0].x, y:result[0].y})
            var x = result[0].x;
            var y = result[0].y;
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });
            map.setCenter(coords);
            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                    var url = `https://map.kakao.com/link/map/${state.name},${y},${x}`
                    window.location.href = url
              });
        } 
      });    
      
      
  },[])

    return(
        <div id="map" className="w-full h-64 " ></div>
    )
}

export default KakaoMap;