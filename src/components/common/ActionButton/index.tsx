import React from 'react';
import { useTheme } from '@emotion/react';

import CustomText from 'components/common/CustomText';

import { StyledPressable } from './styles';

interface ActionButtonProps {
    text: string;
}

const ActionButton = ({ text }: ActionButtonProps) => {
    const theme = useTheme();

    return (
        <StyledPressable>
            <CustomText
                color={theme.colors.components.actionButton.fontColor}
                variant="header">
                {text}
            </CustomText>
        </StyledPressable>
    );
};

export default ActionButton;