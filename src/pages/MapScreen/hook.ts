import { mapRideSheetIndexToMapPadding } from 'constants/bottomSheetSnapPoints';
import { useUserLocationStateContext } from 'context/UserLocationStateContext';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { LatLng, UserLocationChangeEvent } from 'react-native-maps';
import type MapView from 'react-native-maps';
import { MapDirectionsResponse } from 'react-native-maps-directions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.005;


export const useMapScreen = () => {
    const mapRef = useRef<MapView>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [mapMarkers, setMapMarkers] = useState<LatLng[]>([]);
    const [regionMarker, setRegionMarker] = useState<LatLng>({} as LatLng);
    const [mapDirections, setMapDirections] = useState<MapDirectionsResponse>();
    const insets = useSafeAreaInsets();

    const isRouteVisible = mapMarkers.length === 2;

    const {
        userLocation,
        setUserLocation
    } = useUserLocationStateContext();

    // useEffect(() => {
    //     if (mapDirections?.coordinates) {
    //         if (mapDirections?.coordinates) {
    //             mapRef.current?.fitToCoordinates(mapDirections?.coordinates, {
    //                 edgePadding: {
    //                     top: insets.top + scale(30),
    //                     bottom: scale(30),
    //                     left: scale(15),
    //                     right: scale(15),
    //                 },
    //             });
    //         }
    //     }
    // }, [mapDirections?.coordinates, insets.top]);

    const centerToUserLocation = useCallback(() => {
        if (userLocation) {
            mapRef.current?.animateToRegion({
                longitude: userLocation.coords.longitude,
                latitude: userLocation.coords.latitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })


            // limite de zoom
            setRegionMarker(userLocation.coords);
        }
    }, [userLocation]);

    useEffect(() => {
        centerToUserLocation();
    }, [centerToUserLocation]);




    const handleUserLocationChange = ({ nativeEvent: {
        coordinate
    } }: UserLocationChangeEvent) => {
        if (coordinate && !modalVisible && !isRouteVisible) {
            setUserLocation({
                coords: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                },
            });
        }
    }

    const closeDestinationModal = () => {
        setModalVisible(false);
    }

    const handleMapSearchBarPress = () => {
        setModalVisible(true);
    }

    const handlePlaceItemPress = (coords: LatLng) => {
        if (userLocation?.coords) {
            setMapMarkers([userLocation.coords, coords]);
            setModalVisible(false);
        }
    }

    const handleMapDirectionsOnReady = (routeInfo: MapDirectionsResponse) => {
        console.log("ruta iniciada", routeInfo);
        setMapDirections(routeInfo);
    }

    const handleRegionChange = (region: LatLng) => {
        // if (mapMarkers.length === 1) {
        setRegionMarker(region);
        // }
    }

    const handleRoundButtonPress = () => {
        if (isRouteVisible) {
            setMapMarkers([]);
            centerToUserLocation();
        }
    }

    const handleBottomSheetChange = (index: number) => {
        if (mapDirections?.coordinates) {
            mapRef.current?.fitToCoordinates(mapDirections?.coordinates, {
                edgePadding: {
                    top: insets.top + scale(40),
                    bottom: mapRideSheetIndexToMapPadding[index],
                    left: scale(15),
                    right: scale(15),
                },
            });
        }
    };


    return {
        models: {
            mapRef,
            modalVisible,
            mapMarkers,
            regionMarker,
            isRouteVisible,
            mapDirections,
            userLocation
        },
        operations: {
            handleUserLocationChange,
            handleMapSearchBarPress,
            closeDestinationModal,
            handlePlaceItemPress,
            handleMapDirectionsOnReady,
            handleRegionChange,
            handleRoundButtonPress,
            handleBottomSheetChange,
            setRegionMarker
        }
    }
}