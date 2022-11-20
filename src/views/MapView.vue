<template>
  <div id="main_container">
    <SearchComponent @searchKeyword="setKeyword"></SearchComponent>
    <v-btn color="warning" elevation="2" @click.prevent="moveCurrentLocation"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
      현재 위치로</v-btn
    >
    <v-btn color="error" elevation="2" @click.prevent="moveDefaultLocation"
      >기본값 위치로</v-btn
    >

    <div
      class="grid md:grid-cols-1 md:gap-6 bg-white rounded-md my-4 border-2 border-emerald-600"
    >
      <div class="map_wrap">
        <div id="mapViewer" class="max-w-7xl max-h-80 w-full h-full"></div>
        <div class="hAddr">
          <span class="title">지도중심기준 행정동 주소정보</span>
          <span id="centerAddr"></span>
        </div>
      </div>
    </div>
    <!-- <v-card class="mx-auto" max-width="400" tile>
      <v-list-item four-line v-for="(item, index) in searchResult" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ item.place_name }}</v-list-item-title>
          <v-list-item-subtitle>
            <a :href="item.place_url" target="_blank">{{ item.place_url }}</a>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="item.road_address_name != ''">
            도로명주소 : {{ item.road_address_name }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            지번주소 : {{ item.address_name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card> -->
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  data() {
    return {
      defaultLat: 37.6771176065756,
      defaultLng: 126.749259861283,
      lat: 0,
      lng: 0,
      searchResult: [],
      map: {},
      infowindow: {},
      markerList: [],
      keyword: "",
      marker: "",
    };
  },
  methods: {
    initKakao(cb) {
      const scr = document.createElement("script");
      scr.onload = () => window.kakao.maps.load(cb);
      scr.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_JS_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(scr);
    },
    initMap() {
      const container = document.getElementById("mapViewer");
      const opt = {
        center: new window.kakao.maps.LatLng(this.defaultLat, this.defaultLng),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, opt);
      this.infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 });
      this.map.setCenter(
        new window.kakao.maps.LatLng(this.defaultLat, this.defaultLng)
      );
      this.getAddrWithCoord();
    },
    setKeyword(searchKeyword) {
      this.keyword = searchKeyword;
      this.search();
    },
    getAddrWithCoord() {
      //'좌표로 주소 얻어내기 from kakaoMap Api sample' : https://apis.map.kakao.com/web/sample/coord2addr/'
      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      var ctx = this;
      var geocoder = new window.kakao.maps.services.Geocoder();
      this.marker = new window.kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다
      searchAddrFromCoords(ctx.map.getCenter(), displayCenterInfo);
      window.kakao.maps.event.addListener(
        ctx.map,
        "click",
        function (mouseEvent) {
          searchDetailAddrFromCoords(
            mouseEvent.latLng,
            function (result, status) {
              if (status === window.kakao.maps.services.Status.OK) {
                var detailAddr = result[0].road_address
                  ? "<div>도로명주소 : " +
                    result[0].road_address.address_name +
                    "</div>"
                  : "";
                detailAddr +=
                  "<div>지번 주소 : " +
                  result[0].address.address_name +
                  "</div>";
                var content =
                  "<div class='bAddr'>" +
                  "<span class='title'>법정동 주소정보</span>" +
                  detailAddr +
                  "</div>";
                // 마커를 클릭한 위치에 표시합니다
                ctx.marker.setPosition(mouseEvent.latLng);
                ctx.marker.setMap(ctx.map);
                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                ctx.infowindow.setContent(content);
                ctx.infowindow.open(ctx.map, ctx.marker);
              }
            }
          );
        }
      );
      window.kakao.maps.event.addListener(ctx.map, "idle", function () {
        console.log("lat : ", ctx.map.getCenter().La);
        this.lat = ctx.map.getCenter().La;
        console.log("lng : ", ctx.map.getCenter().Ma);
        this.lng = ctx.map.getCenter().Ma;
        searchAddrFromCoords(ctx.map.getCenter(), displayCenterInfo);
      });
      function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }
      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          var infoDiv = document.getElementById("centerAddr");
          for (var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === "H") {
              infoDiv.innerHTML = result[i].address_name;
              break;
            }
          }
        }
      }
    },
    moveLocation(lat, lng) {
      this.removeAllMarker();
      this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
    },
    moveDefaultLocation() {
      this.lat = this.defaultLat;
      this.lng = this.defaultLng;
      this.moveLocation(this.defaultLat, this.defaultLng);
    },
    moveCurrentLocation() {
      var ctx = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.moveLocation(this.lat, this.lng);
          },
          (error) => {
            if (error.code === 1) {
              alert("위치 정보에 문제가 있습니다. 동의여부를 확인하십시오.");
              ctx.moveDefaultLocation();
            }
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS에 문제가 있습니다...");
      }
    },
    removeAllMarker() {
      this.markerList.forEach((marker) => {
        marker.setMap(null);
      });
    },
    search() {
      this.removeAllMarker();
      this.infowindow.close();
      this.marker.setMap(null);
      console.log("저장된 좌표내용 : ", this.pos);
      const ps = new window.kakao.maps.services.Places();
      var opt = {
        y: this.lat,
        x: this.lng,
      };
      ps.keywordSearch(this.keyword, this.setPlacesSearchCB, opt);
    },
    setPlacesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        this.searchResult = [];
        this.markerList = [];
        const bounds = new window.kakao.maps.LatLngBounds();
        console.log("페이지 : ", pagination);
        for (let i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        //console.log("markerList : ", this.markerList);
        this.map.setBounds(bounds);
        console.log(bounds);
      }
    },
    // 마커 표시
    displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new window.kakao.maps.Marker({
        map: this.map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      this.markerList.push(marker);
      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "click", () => {
        this.map.setCenter(new window.kakao.maps.LatLng(place.y, place.x));
        this.map.setLevel(4);
        if (this.infowindow.close) {
          this.infowindow.close();
        }
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        const template = `<div style="padding:5px;">
              <p>${place.road_address_name}</p>
              <p>${place.address_name}</p>
              <p>이름 : <br/><a href="${place.place_url}" target="_blank">${place.place_name}</a></p>
              <p>전화번호 : <br/>${place.phone}</p>
            </div>`;
        this.infowindow = new window.kakao.maps.InfoWindow({
          content: template,
          removable: true,
        });
        this.infowindow.open(this.map, marker);
      });
    },
    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
  },
  mounted() {
    if (typeof window.kakao?.maps === "undefined") {
      this.initKakao(this.initMap);
    } else {
      this.initMap();
    }
  },
  components: { SearchComponent },
};
</script>

<style scoped>
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}
.title {
  font-weight: bold;
  display: block;
}
.hAddr {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 2px;
  background: #fff;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  padding: 5px;
}
#centerAddr {
  display: block;
  margin-top: 2px;
  font-weight: normal;
}
.bAddr {
  padding: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.bAddr div {
  font-size: 14px;
}
</style>
