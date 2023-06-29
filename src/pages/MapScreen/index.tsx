import React, { useState } from 'react'
import { Container, StyleMapContent, StyleMapView } from './styles'
import { useMapScreen } from './hook'
import RoundButton from 'components/RoundButton';
import MapSearchBar from 'components/MapSearchBar';
import DestinationModal from 'components/DestinationModal';
import { Callout, LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { theme } from 'theme/theme';
import { scale } from 'react-native-size-matters';
import { ChooseRideBottomSheet } from 'components/ChooseRideBottomSheet';
import { Image, Text, View } from 'react-native';
import AvatarMarker from 'components/common/AvatarMarker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const MapScreen = () => {
    const [regionMarker, setRegionMarker] = useState<LatLng>({} as LatLng);
    const insets = useSafeAreaInsets();
    const {
        operations,
        models
    } = useMapScreen();

    const renderMapMarkers = () => {
        return models.mapMarkers.map((item, index) => {
            return <Marker
                coordinate={item}
                image={index == 0 && require("../../assets/prueba.png")}
                key={index}
            />
        })
    }

    return (
        <Container>
            <StyleMapView
                ref={models.mapRef}
                showsUserLocation={true}
                userInterfaceStyle='dark'
                onUserLocationChange={operations.handleUserLocationChange}
                showsMyLocationButton={true}
                showsCompass={false}
                customMapStyle={StyleMapContent}
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={setRegionMarker}
                zoomEnabled={true}
                maxZoomLevel={18}
                minZoomLevel={15}

            >

                {models.isRouteVisible && renderMapMarkers()}

                <MapViewDirections
                    origin={models.mapMarkers[0]}
                    destination={models.mapMarkers[1]}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeColor={theme.colors.screens.mapScreen.directionsStroke}
                    strokeWidth={scale(5)}
                    onReady={operations.handleMapDirectionsOnReady}
                />
                {/* marker para mostrar el usuario */}
                {/* {
                    models.userLocation?.coords?.latitude &&
                    <Marker
                        coordinate={models.userLocation?.coords}
                    >
                        <Callout tooltip style={{
                            width: scale(200),
                            height: scale(100),
                            backgroundColor: theme.colors.screens.mapScreen.directionsStroke,
                            borderRadius: scale(10),
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: scale(10)
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: scale(20),
                                fontWeight: 'bold'
                            }}>Yape</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: scale(15),
                                fontWeight: 'bold'
                            }}>S/ 5.00</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: scale(15),
                                fontWeight: 'bold'
                            }}>5 min</Text>
                        </Callout>
                        <AvatarMarker />
                    </Marker>
                } */}
                {
                    (regionMarker?.latitude && !models.isRouteVisible) &&
                    <Marker
                        coordinate={regionMarker}
                        image={require("../../assets/prueba.png")}
                    />
                }

            </StyleMapView>
            <View style={{
                // en el medio
                position: 'absolute',
                top: '49%',
                left: '50%',
                marginLeft: -20,
                marginTop: -40,
                // zIndex: 999,
            }}>
                <AvatarMarker />

            </View>
            <RoundButton
                onPress={operations.handleRoundButtonPress}
                icon={models.isRouteVisible ? 'arrow-back-outline' : 'ios-menu-outline'}
            />
            {/* {
                models.isRouteVisible || models.modalVisible ? null :
                    <MapSearchBar
                        onPress={operations.handleMapSearchBarPress}
                    />
            } */}
            <DestinationModal
                visible={models.modalVisible}
                closeModal={operations.closeDestinationModal}
                onPlaceItemPress={operations.handlePlaceItemPress}
            />
            {/* {models.isRouteVisible ? ( */}
            {/* <ChooseRideBottomSheet
                onChange={operations.handleBottomSheetChange}
                mapDirections={models.mapDirections}
                openModal={operations.handleMapSearchBarPress}

            /> */}
            {/* ) : null} */}
        </Container>
    )
}

export default MapScreen