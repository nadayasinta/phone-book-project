import styled from '@emotion/styled';
import { BackIcon, NextIcon } from '../icons';
import { ButtonIcon } from '../elements';
import { Dispatch, SetStateAction } from 'react';

const PaginationContainer = styled.div({
    display: 'flex',
    paddingBottom: '20px',
    height: '63px',
});
const Pagination = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 'auto',
    backgroundColor: 'white',
    boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    borderRadius: '16px',
});
const NavigationButton = styled(ButtonIcon)({
    padding: '8px 16px 0',
});
const Page = styled.div({
    fontWeight: '500',
    padding: '8px 16px',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRightWidth: 'thin',
    borderLeftWidth: 'thin',
});

interface Props {
    currentPage: number;
    firstPage: number;
    lastPage: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const PaginationComponent = (props: Props) => {
    const { currentPage, firstPage, lastPage, setPage } = props;
    return (
        <PaginationContainer>
            <Pagination>
                <NavigationButton
                    disabled={currentPage === firstPage}
                    onClick={() => setPage((val) => val - 1)}
                >
                    <BackIcon />
                </NavigationButton>
                <Page>{currentPage}</Page>
                <NavigationButton
                    disabled={currentPage === lastPage}
                    onClick={() => setPage((val) => val + 1)}
                >
                    <NextIcon />
                </NavigationButton>
            </Pagination>
        </PaginationContainer>
    );
};

export default PaginationComponent;
