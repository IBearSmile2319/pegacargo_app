import styled from "@emotion/native";
import MapView from "react-native-maps";

export const Container = styled.View({
    flex: 1,

})


export const StyleMapView = styled(MapView)({
    flex: 1,
})


export const StyleMapContent = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": -55
            },
            {
                "lightness": -75
            }
        ]
    },
    {
        "elementType": "labels",
        "stylers": [
            {
                "saturation": -65
            }
        ]
    },
    {
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": -30
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": -65
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1a1919"
            },
            {
                "weight": 0.5
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": -85
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#292929"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#3c4a58"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#2e343d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#827134"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#3d4a58"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#2d333d"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -45
            },
            {
                "lightness": -20
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2e5976"
            }
        ]
    }
]

// [
//     {
//         "featureType": "all",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "invert_lightness": true
//             },
//             {
//                 "saturation": "-9"
//             },
//             {
//                 "lightness": "0"
//             },
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape.man_made",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "weight": "1.00"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "weight": "0.49"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "on"
//             },
//             {
//                 "weight": "0.01"
//             },
//             {
//                 "lightness": "-7"
//             },
//             {
//                 "saturation": "-35"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels",
//         "stylers": [{
//             "visibility": "off"
//         }],
//     }
// ]