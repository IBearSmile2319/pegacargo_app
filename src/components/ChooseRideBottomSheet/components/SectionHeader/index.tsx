import React from 'react';
import { scale } from 'react-native-size-matters';

import CustomText from 'components/common/CustomText';
import Spacer from 'components/common/Spacer';

import { Container } from './styles';

interface SectionHeaderProps {
    title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
    return (
        <Container>
            <Spacer width={scale(25)} />
            <CustomText variant="header">{title}</CustomText>
        </Container>
    );
};

export default SectionHeader;