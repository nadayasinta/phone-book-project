import styled from '@emotion/styled';
import { Contact } from '../types';
import { SectionTitle, Text } from '../elements';
import { Loading } from '../icons';
import Card from '../components/ContactCard';

const Container = styled.div({
    flexDirection: 'row',
    padding: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    maxWidth: '1500px',
    margin: 'auto',
    '.text': {
        flexGrow: 1,
        width: '100%',
    },
    '.card': {
        flexGrow: 1,
        width: '100%',
        '@media (min-width: 768px)': {
            flexBasis: 'calc(50% - 32px)',
            maxWidth: 'calc((100% - 16px)/2)',
        },
        '@media (min-width: 1024px)': {
            flexBasis: 'calc(33.33% - 32px)',
            maxWidth: 'calc((100% - 16px)/3)',
        },
    },
});

const LoadingContainer = styled.div({
    flexGrow: 1,
    textAlign: 'center',
});

interface Props {
    type: 'favorite' | 'list';
    emptyMessage: string;
    loading: boolean;
    contactList?: Contact[];
    favoriteContactId: number;
    handleFavoriteButton: (id: number) => void;
    handleEditButton: (id: number) => void;
    handleDeleteButton: (id: number) => void;
}

const ContactListComponent = (props: Props) => {
    const {
        type,
        loading,
        emptyMessage,
        contactList = [],
        favoriteContactId,
        ...cardAction
    } = props;
    return (
        <Container aria-label={`${type}-container`}>
            {type === 'favorite' && (
                <SectionTitle className='text'>&#9733; Favorite</SectionTitle>
            )}
            {loading && (
                <LoadingContainer aria-label='loading'>
                    <Loading />
                </LoadingContainer>
            )}
            {!loading && !contactList?.length && (
                <Text className='text disabled center'>{emptyMessage}</Text>
            )}
            {!loading &&
                !!contactList?.length &&
                contactList.map((contact: any) => (
                    <Card
                        key={contact.id}
                        data={contact}
                        isFavorite={contact.id === favoriteContactId}
                        {...cardAction}
                    />
                ))}
        </Container>
    );
};

export default ContactListComponent;
