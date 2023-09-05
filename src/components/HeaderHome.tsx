import styled from '@emotion/styled';
import {
    useState,
    Dispatch,
    SetStateAction,
    ChangeEventHandler,
    useEffect,
} from 'react';
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

    useEffect(() => {
        if (searchValue) {
            setSearchVisible(true);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                        <ButtonIcon onClick={toggleSearch} aria-label='search-button'>
                            <SearchIcon />
                        </ButtonIcon>
                        <ButtonIcon onClick={handleAddButton} aria-label='add-button'>
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
                    <ButtonIcon onClick={toggleSearch} aria-label='cancel-button'>
                        <CancelIcon />
                    </ButtonIcon>
                </>
            )}
        </Header>
    );
};

export default HeaderComponent;
