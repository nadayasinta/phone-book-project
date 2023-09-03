import styled from '@emotion/styled';
import { ReactNode } from 'react';

const HeaderContainer = styled.div({
    display: 'flex',
    height: '75px',
    padding: '0px',
});

const Header = styled.nav({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    padding: '16px 24px',
    position: 'fixed',
    width: '100%',
    height: '75px',
    gap: '8px',
    zIndex: 1,
});

interface Props {
    children?: ReactNode;
}

const HeaderComponent = (props: Props) => {
    const { children } = props;
    return (
        <>
            <Header>{children}</Header>
            <HeaderContainer />
        </>
    );
};

export default HeaderComponent;
