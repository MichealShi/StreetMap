var map;
var infoWindow;
var markers = [];
const locations = [
    {title: '银河SOHO', location: {lat: 39.921170, lng: 116.433120}},
    {title: '雍和宫', location: {lat: 39.948553, lng: 116.417678}},
    {title: '恭王府', location: {lat: 39.937355, lng: 116.386191}},
    {title: '鸟巢', location: {lat: 39.993145, lng: 116.396054}},
    {title: '北京798艺术区', location: {lat: 39.984072, lng: 116.495281}}
];
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.883771, lng: 116.413904},
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow();
    for (let loc of locations) {
        var position = loc.location;
        var title = loc.title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
        });
        markers.push(marker);
        marker.addListener('click', function () {
            var self = this;
            requestPlaceInfo(self, function (data) {
                populateFoursquareInfoWindow(self, data);
            });
        });
    }
}

/**
 * 初始化标记
 * @param positions 位置信息
 */
function showMarkers(positions) {
    clearMarkers();
    for (let pos of positions) {
        var marker = createMarker(pos);
        markers.push(marker);
        marker.addListener('click', function () {
            var self = this;
            requestPlaceInfo(self, function (data) {
                populateFoursquareInfoWindow(self, data);
            });
        });
    }
}

/**
 * 创建标记
 * @param loc 地理位置信息
 * @param index pos
 * @returns {google.maps.Marker}
 */
function createMarker(loc) {
    return new google.maps.Marker({
        map: map,
        position: loc.location,
        title: loc.title,
        animation: google.maps.Animation.DROP,
    });
}

/**
 * 显示过滤后的标记
 * @param loc
 */
function filterMarker(loc) {
    var marker = createMarker(loc);
    marker.addListener('click', function () {
        var self = this;
        requestPlaceInfo(self, function (data) {
            populateFoursquareInfoWindow(self, data);
        });
    });
    markers.push(marker);
}

/**
 * 清理标记
 */
function clearMarkers() {
    for (let marker of markers) {
        marker.setMap(null);
    }
}

/**
 * 根据输入框内容搜索位置
 */
function search() {
    var place = document.getElementById("filter").value;
    console.log("text = " + place);
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: locations[0].location,
        radius: 50000,
        name: place
    }, callback);
};

/**
 * 搜索结果回调
 * @param results 搜索结果
 * @param status 接口状态
 */
function callback(results, status) {
    clearMarkers();
    // 如果请求成功,在地图上展示搜索结果
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let res of results) {
            createMarkerByPlace(res);
        }
        // 地图中心设置成第一个点的位置
        map.setCenter(results[0].geometry.location);
    }
}

/**
 * 根据place创建标记
 * @param place
 */
function createMarkerByPlace(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}

/**
 * 获取 foursquare 数据
 * @param { Object } location
 */
function requestPlaceInfo(location, callback) {
    var clientId = 'JEJWRA4ORXBMRZHYJYDYUTKBJ1RKADQ4PCRWG4R2QTXT0S4P';
    var clientSecret = 'T5SZZHOCD0MH1ZBKAOPRW31B0BXGFTNCDSVFYALCYBZ0XHDW';
    var url = 'https://api.foursquare.com/v2/venues/search?v=20170801';
    var requestUrl = url + '&client_id=' + clientId + '&client_secret=' + clientSecret
        + '&query=' + location.title + "&ll=" + location.position.lat() + "," + location.position.lng();
    console.log(requestUrl);
    $.get(requestUrl)
        .done(function (data) {
            var address = data.response.venues[0].location.formattedAddress.reverse().join(",") + "," + location.title;
            console.log("address = " + address);
            callback(address);
        })
        .fail(function () {
            callback(location.title);
        });
}

/**
 * 根据Foursquare请求结果创建InfoWindow
 * @param { Object } marker Marker对象
 * @param { Object } infoWindow InfoWindow对象
 */
function populateFoursquareInfoWindow(marker, displayContent) {
    if (!marker.map) {
        marker.setMap(map);
    }
    // Check to make sure the infoWindow is not already opened on this marker.
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent(displayContent);
        infoWindow.open(map, marker);
        // Make sure the marker property is cleared if the infoWindow is closed.
        infoWindow.addListener('closeclick', function () {
            infoWindow.setMarker = null;
        });
        // bounce marker
        marker.setAnimation(google.maps.Animation.BOUNCE);
        // clear animation
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1400)
    }
}

/**
 * api请求异常处理
 * @constructor
 */
function Error() {
    alert('something do not work');
}