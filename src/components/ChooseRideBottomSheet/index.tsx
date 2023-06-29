import React from 'react';
import BottomSheet, { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { Button } from 'react-native'
import { type SectionListData, type SectionListRenderItem } from 'react-native/types';
import type { MapDirectionsResponse } from 'react-native-maps-directions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { rideSheetSnapPoints } from 'constants/bottomSheetSnapPoints';
import type { RideItem } from 'types/rideItem';
import { calculateRidePrice } from 'utils/calculateRidePrice';
import SectionHeader from './components/SectionHeader';

import { ChooseRideItem } from './components/ChooseRideItem';
import { ridesData } from './mockData';
import { useChooseRideBottomSheet } from './hook';
import Header from './components/Header';
import Footer from './components/Footer';
import { useMapScreen } from 'pages/MapScreen/hook';
import DestinationModal from 'components/DestinationModal';

interface ChooseRideBottomSheetProps {
    onChange: (index: number) => void;
    mapDirections?: MapDirectionsResponse;
    openModal?: () => void;
}

export const ChooseRideBottomSheet = ({
    onChange,
    mapDirections,
    openModal
}: ChooseRideBottomSheetProps) => {
    const insets = useSafeAreaInsets();
    const { models, operations } = useChooseRideBottomSheet({ onChange });

    const renderSectionHeader = ({
        section,
    }: {
        section: SectionListData<RideItem>;
    }) => {
        // return models.isBottomSheetExpanded ? (
        return <SectionHeader title={section.title} />
        // ) : null;
    };

    const renderSectionItem: SectionListRenderItem<RideItem> = ({ item }) => {
        return (
            <ChooseRideItem
                key={item.id}
                // variant={models.isBottomSheetExpanded ? 'expanded' : 'compact'}
                variant={'compact'}
                onPress={operations.handleRideItemPress(item)}
                title={item.type}
                price={calculateRidePrice(item.price, mapDirections)}
                eta={item.eta}
                description={item.description}
                selected={item.id === models.selectedRide.id}
                maxPassengers={item.maxPassengers}
            />
        );
    };

    return (
        <>
            <BottomSheet
                index={1}
                onChange={operations.handleBottomSheetChange}
                snapPoints={rideSheetSnapPoints(insets)}>
                <Header />
                {/* <BottomSheetSectionList
                    renderItem={renderSectionItem}
                    sections={ridesData}

                    // renderSectionHeader={renderSectionHeader}
                    stickySectionHeadersEnabled={false}
                    horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={true}
                /> */}
                <Button title='modal' onPress={openModal}
                />

            </BottomSheet>
            <Footer selectedRide={models.selectedRide} offset={models.footerOffset} />

        </>
    );
};