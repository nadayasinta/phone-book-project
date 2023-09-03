import Headers from '../components/HeaderHome';
import Pagination from '../components/Pagination';
import ContactList from '../components/ContactList';
import { useQuery, useMutation } from '@apollo/client';
import { GetContacts, GetContact, GetCountContact } from '../types';
import { GET_CONTACTS, GET_CONTACT, GET_TOTAL_CONTACT } from '../graphql/query';
import { DELETE_CONTACT } from '../graphql/mutation';
import { useMemo } from 'react';
import { Divider } from '../elements';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const initiaPage = 1;
const limit = 10;

const Home = () => {
    const navigate = useNavigate();
    const [favoriteId, setFavoriteId] = useLocalStorage<number>(
        'favoriteId',
        0
    );
    const [page, setPage] = useLocalStorage<number>('page', initiaPage);
    const [searchValue, setSearchValue] = useLocalStorage<string>(
        'searchValue',
        ''
    );

    const contactListVariable = useMemo(() => {
        return {
            order_by: [{ first_name: 'asc' }],
            ...(searchValue
                ? {
                    where: {
                        _or: [
                            { first_name: { _ilike: `%${searchValue}%` } },
                            { last_name: { _ilike: `%${searchValue}%` } },
                        ],
                    },
                }
                : {
                    limit,
                    offset: (page - 1) * limit,
                    where: { id: { _neq: favoriteId } },
                }),
        };
    }, [page, favoriteId, searchValue]);

    const { data: contactList, loading: loadingContactList } =
        useQuery<GetContacts>(GET_CONTACTS, { variables: contactListVariable });
    const { data: favoriteContact, loading: loadingFavoriteContact } =
        useQuery<GetContact>(GET_CONTACT, { variables: { id: favoriteId } });
    const { data: totalContact } = useQuery<GetCountContact>(GET_TOTAL_CONTACT);
    const [deleteContact] = useMutation(DELETE_CONTACT, {
        refetchQueries: [GET_CONTACTS, GET_TOTAL_CONTACT],
    });

    const lastPage: number = useMemo(() => {
        if (!totalContact?.contact_aggregate.aggregate.count) return initiaPage;
        return Math.ceil(
            totalContact.contact_aggregate.aggregate.count / limit
        );
    }, [totalContact]);

    const handleFavoriteButton = (id: number) => {
        setFavoriteId(id === favoriteId ? 0 : id);
    };

    const handleEditButton = (id: number) => {
        navigate(`/update/${id}`);
    };

    const handleDeleteButton = (id: number) => {
        deleteContact({ variables: { id } });
    };

    return (
        <>
            <Headers
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            {!searchValue && page === initiaPage && (
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
                        favoriteContactId={favoriteId}
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
                favoriteContactId={favoriteId}
                handleFavoriteButton={handleFavoriteButton}
                handleEditButton={handleEditButton}
                handleDeleteButton={handleDeleteButton}
            />
            {!searchValue && lastPage > initiaPage && (
                <Pagination
                    currentPage={page}
                    firstPage={initiaPage}
                    lastPage={lastPage}
                    setPage={setPage}
                />
            )}
        </>
    );
};

export default Home;
