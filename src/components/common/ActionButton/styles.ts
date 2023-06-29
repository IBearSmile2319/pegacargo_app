import styled from '@emotion/native';
import { scale } from 'react-native-size-matters';

export const StyledPressable = styled.Pressable(({ theme }) => {
    return {
        height: scale(40),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(44),
        backgroundColor: theme.colors.components.actionButton.backgroundColor,
    };
});