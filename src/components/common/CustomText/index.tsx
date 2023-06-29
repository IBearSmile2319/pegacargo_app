import { View, Text } from 'react-native'
import React from 'react'
import {
    BodyText,
    TitleText,
    CaptionText,
    HeaderText,
    SmallHeaderText,
} from './styles';

interface CustomTextProps {
    variant: 'body' | 'title' | 'caption' | 'header' | 'smHeader';
    children: string;
    color?: string;
}
const getComponent = (variant: CustomTextProps['variant']) => {
    switch (variant) {
        case 'body':
            return BodyText;
        case 'title':
            return TitleText;
        case 'caption':
            return CaptionText;
        case 'header':
            return HeaderText;
        case 'smHeader':
            return SmallHeaderText;
        default:
            return BodyText;
    }
}

const CustomText = ({ variant, children, color }: CustomTextProps) => {
    const Component = getComponent(variant)

    const sharedProps = {
        style: {
            ...(color ? { color } : {}),
        },
    };

    return <Component {...sharedProps}>
        {children}
    </Component>
}

export default CustomText