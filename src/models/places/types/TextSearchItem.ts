import { AxiosResponse } from "axios";

export type TextSearchItem = {
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    icon: string;
    name: string;
    place_id: string;
};


export type DetailsResponse = AxiosResponse<{
    html_attributions: any[]
    result: Result
    status: string
}>

export interface Result {
    address_components: AddressComponent[]
    adr_address: string
    formatted_address: string
    geometry: Geometry
    icon: string
    icon_background_color: string
    icon_mask_base_uri: string
    name: string
    place_id: string
    reference: string
    types: string[]
    url: string
    utc_offset: number
    vicinity: string
}

export interface AddressComponent {
    long_name: string
    short_name: string
    types: string[]
}

export interface Geometry {
    location: Location
    viewport: Viewport
}

export interface Location {
    lat: number
    lng: number
}

export interface Viewport {
    northeast: Northeast
    southwest: Southwest
}

export interface Northeast {
    lat: number
    lng: number
}

export interface Southwest {
    lat: number
    lng: number
}



// search autocomplete
export type AutoCompleteResponse = AxiosResponse<{
    predictions: Prediction[]
    status: string
}>

export interface Prediction {
    description: string
    matched_substrings: MatchedSubstring[]
    place_id: string
    reference: string
    structured_formatting: StructuredFormatting
    terms: Term[]
    types: string[]
}

export interface MatchedSubstring {
    length: number
    offset: number
}

export interface StructuredFormatting {
    main_text: string
    main_text_matched_substrings: MainTextMatchedSubstring[]
    secondary_text: string
}

export interface MainTextMatchedSubstring {
    length: number
    offset: number
}

export interface Term {
    offset: number
    value: string
}
