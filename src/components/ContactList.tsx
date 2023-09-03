import styled from '@emotion/styled';
import { Contact } from '../types';
import {
    SectionTitle as SectionTitleComponent,
    Text,
    Container,
} from '../elements';

import Card from '../components/ContactCard';

const SectionTitle = styled(SectionTitleComponent)({
    color: '#4a4b4c',
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
        <Container>
            {type === 'favorite' && (
                <SectionTitle>&#9733; Favorite</SectionTitle>
            )}
            {!contactList || !contactList.length ? (
                <Text className='disabled center'>{emptyMessage}</Text>
            ) : (
                contactList.map((contact: any) => (
                    <Card
                        key={contact.id}
                        data={contact}
                        isFavorite={contact.id === favoriteContactId}
                        {...cardAction}
                    />
                ))
            )}
        </Container>
    );
};

export default ContactListComponent;
