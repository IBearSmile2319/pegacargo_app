import { useTheme } from '@emotion/react';
import React from 'react';

import { DisabledInput, Input } from './styles';

// TODO: rebuild it and make it extend input props
// Omit editable props
// Record it again and put after this component is done

interface DestinationInputProps {
    disabled?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
    onChangeText?: (text: string) => void;
    value?: string;
}

const DestinationInput = ({
    disabled,
    placeholder,
    autoFocus,
    onChangeText,
    value,
}: DestinationInputProps) => {
    const theme = useTheme();
    const sharedProps = { placeholder };

    return disabled ? (
        <DisabledInput
            editable={false}
            {...sharedProps}
            placeholderTextColor={theme.colors.typography.textDisabled}
        />
    ) : (
        <Input
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            {...sharedProps}
            value={value}
        />
    );
};

export default DestinationInput;