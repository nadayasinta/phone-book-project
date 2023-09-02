import styled from '@emotion/styled'
import { useState, Dispatch, SetStateAction, ChangeEventHandler } from 'react';
import { Title, } from '../elements/index'

const Header = styled.nav({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    padding: '20px 24px',
})

const SearchBox = styled.div({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& input': {
        border: 'none',
        padding: '5px',
        borderRadius: '4px',
        transition: ' all 0.3s',
        width: 0,
        opacity: 0,
        overflow: 'hidden',
        '&.active': {
            width: '100%',
            maxWidth: '150px',
            opacity: 1,
            marginRight: '10px',
        },
    },
    '& button': {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        color: 'white',
        cursor: 'pointer',
        outline: 'none',
    }
})

interface Props {
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
}

const HeaderComponent = (props: Props) => {
    const { searchValue, setSearchValue } = props
    const [isSearchVisible, setSearchVisible] = useState<boolean>(false);

    const toggleSearch = () => {
        const newValue = !isSearchVisible
        setSearchVisible(newValue);
        if (!newValue) {
            setSearchValue('')
        }
    };

    const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value)
    };

    return <Header>
        <Title>Conntacts</Title>
        <SearchBox className={`search-container ${isSearchVisible ? 'active' : ''}`}>
            <input
                value={searchValue}
                type="text"
                placeholder="Search..."
                className={`search-box ${isSearchVisible ? 'active' : ''}`}
                onChange={handleChangeSearch}
            />
            <button onClick={toggleSearch} className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>

            </button>
        </SearchBox>
    </Header>;
};

export default HeaderComponent;