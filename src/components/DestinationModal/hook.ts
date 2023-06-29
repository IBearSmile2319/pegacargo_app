import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import type { LatLng } from 'react-native-maps';

import { useTextSearchQuery } from 'models/places/useTextSearchQuery';
import useSearchHistory from 'hooks/useSearchHistory';
import type { DetailsResponse, Prediction, Result, TextSearchItem } from 'models/places/types/TextSearchItem';
import { GOOGLE_MAPS_API_KEY } from '@env';
import axios from 'axios';
import { useUserLocationStateContext } from 'context/UserLocationStateContext';

type UseDestinationModal = {
    onPlaceItemPress: (coords: LatLng) => void;
    closeModal: () => void;
};

// const requestPlaceDetailUrl = "https://maps.googleapis.com/maps/api/place/details/json"

export const useDestinationModal = ({
    onPlaceItemPress,
    closeModal,
}: UseDestinationModal) => {
    const [destinationInputValue, setDestinationInputValue] = useState('');
    const [debouncedDestinationInputValue] = useDebounce(
        destinationInputValue,
        500,
    );
    // const { userLocation } = useUserLocationStateContext();

    const { searchHistoryItems, addItemToSearchHistory } = useSearchHistory(
        'places',
        'place_id',
    );

    const { responseData } = useTextSearchQuery(debouncedDestinationInputValue);

    const handleDestinationInputTextChange = (value: string) => {
        setDestinationInputValue(value);
    };

    const handlePlaceItemPress = (item: TextSearchItem) => {

        // const { data: {
        //     result: placeDetailData
        // } } = await axios.get<any, DetailsResponse>(
        //     requestPlaceDetailUrl,
        //     {
        //         params: {
        //             place_id: item.place_id,
        //             language: 'es',
        //             location: `${userLocation?.coords.latitude},${userLocation?.coords.longitude}`,
        //             key: GOOGLE_MAPS_API_KEY,
        //         },
        //     },
        // );

        return () => {
            onPlaceItemPress({
                latitude: item?.geometry.location.lat,
                longitude: item?.geometry.location.lng,
            });
            addItemToSearchHistory(item);
        };
    };

    const handleRoundButtonPress = () => {
        closeModal();
    };

    const handleModalDismiss = () => {
        setDestinationInputValue('');
    };

    return {
        models: {
            destinationInputValue,
            textSearchQueryResponseData: responseData?.results || searchHistoryItems,
        },
        operations: {
            handleDestinationInputTextChange,
            handlePlaceItemPress,
            handleRoundButtonPress,
            handleModalDismiss,
        },
    };
};