import styled from '@emotion/styled';
import { Loading } from '../icons';

const LoadingContainer = styled.div({
    flexGrow: 1,
    textAlign: 'center',
});

const LoadingComponent = () => {
    return (
        <LoadingContainer aria-label='loading'>
            <Loading />
        </LoadingContainer>
    );
};

export default LoadingComponent;
