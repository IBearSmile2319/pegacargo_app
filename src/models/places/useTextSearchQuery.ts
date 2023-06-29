import { GOOGLE_MAPS_API_KEY } from '@env';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useUserLocationStateContext } from 'context/UserLocationStateContext';

import type { AutoCompleteResponse, DetailsResponse, Prediction, TextSearchItem } from './types/TextSearchItem';

type TextSearchQueryResponse = AxiosResponse<{
    status: string;
    results: TextSearchItem[];
}>;

export const useTextSearchQuery = (searchQuery?: string) => {
    const [responseData, setResponseData] =
        useState<TextSearchQueryResponse['data']>();
    const { userLocation } = useUserLocationStateContext();

    const requestUrl =
        // 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    // "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    // const requestPlaceDetailUrl = "https://maps.googleapis.com/maps/api/place/details/json"

    useEffect(() => {
        if (searchQuery && searchQuery !== '' && userLocation) {
            (async () => {
                try {
                    // const { data } = await axios.get<any, AutoCompleteResponse>(
                    //     requestUrl,
                    //     {
                    //         params: {
                    //             input: searchQuery,
                    //             radius: 1000,
                    //             location: `${userLocation?.coords.latitude},${userLocation?.coords.longitude}`,
                    //             language: 'es',
                    //             key: GOOGLE_MAPS_API_KEY,
                    //         },
                    //     },
                    // );


                    const { data } = await axios.get<any, TextSearchQueryResponse>(
                        requestUrl,
                        {
                            params: {
                                // query: searchQuery,
                                keyword: searchQuery,
                                location: `${userLocation?.coords.latitude},${userLocation?.coords.longitude}`,
                                radius: 1000,
                                language: 'es',
                                key: GOOGLE_MAPS_API_KEY,
                            },
                        },
                    );
                    // 
                    setResponseData(data);
                } catch (err) {
                    console.log(err);
                }
            })();
        } else {
            setResponseData(undefined);
        }
    }, [
        searchQuery,
        // userLocation?.coords.latitude,
        // userLocation?.coords.longitude,
    ]);

    return { responseData };
};