import styled from '@emotion/styled';
import { Title } from '../elements';

export const HeaderContainer = styled.div({
    display: 'flex',
    height: '75px',
    padding: '0px',
});

export const Header = styled.nav({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    padding: '20px 24px',
    position: 'fixed',
    width: '100%',
});

interface Props {
    title: string;
    children?: React.ReactNode;
}

const HeaderComponent = (props: Props) => {
    const { title, children } = props;
    return (
        <>
            <Header>
                <Title>{title}</Title>
                {children}
            </Header>
            <HeaderContainer />
        </>
    );
};

export default HeaderComponent;
