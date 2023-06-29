import styled from '@emotion/native';
import { scale } from 'react-native-size-matters';

export const Container = styled.View({
    height: scale(50),
    alignItems: 'flex-start',
    paddingHorizontal: scale(20),
});