import styled from '@emotion/styled'
import { Contact } from '../types/index';
import { SectionTitle as SectionTitleComponent, Text as TextComponent } from '../elements/index'

import Card from '../components/ContactCard';

const Container = styled.div({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
})

const SectionTitle = styled(SectionTitleComponent)({
    color: '#4a4b4c'
});

const Text = styled(TextComponent)({
    textAlign: 'center',
    color: '#7c7d7e'
});

interface Props {
    type: 'favorite' | 'list'
    emptyMessage: string,
    loading: boolean
    contactList?: Contact[]
    handleFavoriteButton: (id: number) => void
    handleEditButton: (id: number) => void
    handleDeleteButton: (id: number) => void
}

const ContactListComponent = (props: Props) => {
    const { type, loading, emptyMessage, contactList = [], ...cardAction } = props
    return <Container>
        {type === 'favorite' && <SectionTitle>Favorite</SectionTitle>}
        {!contactList || !contactList.length ? <Text>{emptyMessage}</Text> : contactList.map((contact: any) => <Card key={contact.id} data={contact} isFavorite={type === 'favorite'} {...cardAction} />)}
    </Container>;
};

export default ContactListComponent;