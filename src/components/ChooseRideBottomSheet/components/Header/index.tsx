import React from 'react';
import { scale } from 'react-native-size-matters';

import CustomText from 'components/common/CustomText';
import Spacer from 'components/common/Spacer';
import Divider from 'components/common/Divider';

import { Container } from './styles';

const Header = () => {
    return (
        <Container>
            <Spacer height={scale(15)} />
            <CustomText variant="title">
                ¿Qué necesitas hoy?
            </CustomText>
        </Container>
    );
};

export default Header;