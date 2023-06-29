import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyledPressable } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters';

interface RoundButtonProps {
    icon: 'ios-menu-outline' | 'arrow-back-outline' | 'trash'
    onPress?: () => void;
}


const RoundButton = ({ icon, onPress }: RoundButtonProps) => {
    const insets = useSafeAreaInsets()
    return <StyledPressable
        insets={insets}
        onPress={onPress}
    >
        <Icon
            name={icon}
            size={scale(27)}
            color="#000"
        />
    </StyledPressable>
}

export default RoundButton