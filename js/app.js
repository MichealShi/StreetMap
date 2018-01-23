var ViewModel = function () {
    var self = this;
    // 输入框监听
    self.filter = ko.observable('');

    self.filterLocation = ko.computed(function () {
        var res = locations.filter(function (lot) {
            return lot.title.toLowerCase().indexOf(self.filter().toLowerCase()) > -1;
        });
        // 设置地图标记
        showMarkers(res);
        return res;
    });
    /**
     * 点击地点高亮地图上的标记
     */
    self.markLocation = function (pos) {
        // 清理Markers
        clearMarkers();
        google.maps.event.trigger(markers[locations.indexOf(pos)], 'click');
        map.setCenter(pos.location);
    };

    self.searchPlace = function () {
        search();
    };
};
function initApp() {
    initMap();
    ko.applyBindings(new ViewModel());
}
