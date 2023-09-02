import Headers from '../components/HeaderHome';
import ContactList from '../components/ContactList';
import { useQuery, useMutation } from '@apollo/client';
import { GetContacts, GetContact } from '../types';
import { GET_CONTACTS, GET_CONTACT } from '../graphql/query';
import { DELETE_CONTACT } from '../graphql/mutation';
import { useMemo, useState } from 'react';
import { Divider } from '../elements';
import { useNavigate } from 'react-router-dom';

const limit = 10;
const Home = () => {
    const navigate = useNavigate();
    const [favoriteId, setFavoriteId] = useState<number>(5751);
    const [page, setPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>('');
    const contactListVariable = useMemo(() => {
        return {
            limit,
            offset: page * limit,
            order_by: [{ first_name: 'asc' }],
            where: {
                _and: [
                    ...(searchValue ? [{}] : [{ id: { _neq: favoriteId } }]),
                    {
                        _or: [
                            { first_name: { _ilike: `%${searchValue}%` } },
                            { last_name: { _ilike: `%${searchValue}%` } },
                        ],
                    },
                ],
            },
        };
    }, [page, favoriteId, searchValue]);
    const {
        data: contactList,
        loading: loadingContactList,
        refetch: refetchContactList,
    } = useQuery<GetContacts>(GET_CONTACTS, { variables: contactListVariable });
    const {
        data: favoriteContact,
        loading: loadingFavoriteContact,
        refetch: refetchFavoriteContact,
    } = useQuery<GetContact>(GET_CONTACT, { variables: { id: favoriteId } });
    const [deleteContact] = useMutation(DELETE_CONTACT);

    const handleFavoriteButton = (id: number) => {
        setFavoriteId(id === favoriteId ? 0 : id);
    };

    const handleEditButton = (id: number) => {
        navigate(`/update/${id}`);
    };

    const handleDeleteButton = async (id: number) => {
        await deleteContact({ variables: { id } });
        refetchContactList();
        refetchFavoriteContact();
    };

    return (
        <>
            <Headers
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            {!searchValue && page === 0 && (
                <>
                    <ContactList
                        type='favorite'
                        emptyMessage='Your favorite list is empty'
                        loading={loadingContactList}
                        contactList={
                            favoriteContact?.contact_by_pk
                                ? [favoriteContact?.contact_by_pk]
                                : []
                        }
                        handleFavoriteButton={handleFavoriteButton}
                        handleEditButton={handleEditButton}
                        handleDeleteButton={handleDeleteButton}
                    />
                    <Divider />
                </>
            )}
            <ContactList
                type='list'
                emptyMessage='Your contact list is empty'
                loading={loadingFavoriteContact}
                contactList={contactList?.contact}
                handleFavoriteButton={handleFavoriteButton}
                handleEditButton={handleEditButton}
                handleDeleteButton={handleDeleteButton}
            />
        </>
    );
};

export default Home;
