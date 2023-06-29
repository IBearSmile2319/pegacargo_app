import React from 'react';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@emotion/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SharedValue } from 'react-native-reanimated';
import { withTiming, useAnimatedStyle } from 'react-native-reanimated';

import Divider from 'components/common/Divider';
import Spacer from 'components/common/Spacer';
import CustomText from 'components/common/CustomText';
import ActionButton from 'components/common/ActionButton';
import type { RideItem } from 'types/rideItem';

import {
    ButtonContainer,
    Container,
    HorizontalContainer,
    IconsContainer,
    LeftIconContainer,
    PayImage,
    TextContainer,
} from './styles';
import { View } from 'react-native';

interface FooterProps {
    selectedRide: RideItem;
    offset: SharedValue<number>;
}

const Footer = ({ selectedRide, offset }: FooterProps) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(offset.value) }],
        };
    });

    return (
        <Container style={animatedStyle} insets={insets}>
            <Divider />
            <Spacer height={scale(15)} />
            <HorizontalContainer>
                <LeftIconContainer>
                    <PayImage source={require('../../../../assets/yape.png')} />
                </LeftIconContainer>
                <CustomText variant='title'>
                    Yape
                </CustomText>
                <Spacer width={scale(2)} />
                <Icon
                    name="chevron-down-outline"
                    size={scale(16)}
                    color={theme.colors.typography.body}
                />
                <View style={{ flex: 1 }} />
                <CustomText variant='title'>
                    Detalles
                </CustomText>
                <Spacer width={scale(5)} />
                <Icon
                    name="chevron-down-outline"
                    size={scale(16)}
                    color={theme.colors.typography.body}
                />

            </HorizontalContainer>
            <Spacer height={scale(15)} />
            <ButtonContainer>
                <ActionButton text={`Buscar`} />
            </ButtonContainer>
        </Container>
    );
};

export default Footer;