import styled from '@emotion/styled';
import { useState, Dispatch, SetStateAction, ChangeEventHandler } from 'react';
import Header from './Header';
import { Input as InputComponent, ButtonIcon, Title } from '../elements';
import { useNavigate } from 'react-router-dom';
import { CancelIcon, AddIcon, SearchIcon } from '../icons';

const Input = styled(InputComponent)({
    flexGrow: 1,
    transition: 'all 0.3s',
});

const Action = styled.div({
    display: 'flex',
    gap: '20px',
});

interface Props {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

const HeaderComponent = (props: Props) => {
    const navigate = useNavigate();
    const { searchValue, setSearchValue } = props;
    const [isSearchVisible, setSearchVisible] = useState<boolean>(false);

    const toggleSearch = () => {
        const newValue = !isSearchVisible;
        setSearchVisible(newValue);
        if (!newValue) {
            setSearchValue('');
        }
    };

    const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setSearchValue(event.target.value);
    };

    const handleAddButton = () => {
        navigate(`/create`);
    };

    return (
        <Header>
            {!isSearchVisible ? (
                <>
                    <Title>Conntacts</Title>
                    <Action>
                        <ButtonIcon onClick={toggleSearch}>
                            <SearchIcon />
                        </ButtonIcon>
                        <ButtonIcon onClick={handleAddButton}>
                            <AddIcon />
                        </ButtonIcon>
                    </Action>
                </>
            ) : (
                <>
                    <Input
                        value={searchValue}
                        type='text'
                        placeholder='Search...'
                        className={`search-box ${isSearchVisible ? 'active' : ''
                            }`}
                        onChange={handleChangeSearch}
                    />
                    <ButtonIcon onClick={toggleSearch}>
                        <CancelIcon />
                    </ButtonIcon>
                </>
            )}
        </Header>
    );
};

export default HeaderComponent;
