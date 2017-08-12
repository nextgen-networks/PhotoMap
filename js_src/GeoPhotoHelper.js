'use strict'

/**
 * PhotoMap
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Piotr Bator <prbator@gmail.com>
 * @copyright Piotr Bator 2017
 */

export default class GeoPhotoHelper {

    calculateGeoPhotosBoundPoints(geoPhotos) {
        if (geoPhotos && geoPhotos.length) {
            var fPhoto = geoPhotos[0];
            var minLat = fPhoto.lat, maxLat = fPhoto.lat, minLng = fPhoto.lng, maxLng = fPhoto.lng;
            for (var i = 0; i < geoPhotos.length; i++) {
                var lat = geoPhotos[i].lat;
                var lng = geoPhotos[i].lng;
                if (minLat > lat) {
                    minLat = lat;
                } else if (maxLat < lat) {
                    maxLat = lat;
                }
                if (minLng > lng) {
                    minLng = lng;
                } else if (maxLng < lng) {
                    maxLng = lng;
                }
            }
            return [[minLat, minLng],[maxLat, maxLng]];
        }
    }

    calculateTrack(geoPhotos) {
        var tracksData = [];
        for (var i = 0; i < geoPhotos.length; i++) {
            var geoPhoto = geoPhotos[i];
            var date = new Date(geoPhoto.takenDate * 1000);
            var trackKey = geoPhotos[i].folderId + '_' + date.getFullYear() + date.getMonth() + date.getDay();
            if (!tracksData[trackKey]) {
                tracksData[trackKey] = [];
            }
            tracksData[trackKey].push({
                lat: geoPhoto.lat,
                lng: geoPhoto.lng,
                takenDate: geoPhoto.takenDate
            });
        }
        var tracks = [];
        for (i in tracksData) {
            if (tracksData.hasOwnProperty(i)) {
                tracksData[i].sort(function(a ,b) {
                    return a.takenDate - b.takenDate;
                });
                tracks.push(tracksData[i]);
            }
        }
        return tracks;
    }

}