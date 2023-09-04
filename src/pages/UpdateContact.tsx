import { Phones, ContactForm, GetContact } from '../types';
import FormContact from '../components/FormContact';
import { PUT_CONTACT } from '../graphql/mutation';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_CONTACT, GET_CONTACTS } from '../graphql/query';
import { useQuery, useMutation } from '@apollo/client';

const UpdateContact = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { data, loading } = useQuery<GetContact>(GET_CONTACT, {
        variables: { id: id && parseInt(id) ? parseInt(id) : 0 },
    });
    const [putContact] = useMutation(PUT_CONTACT, {
        refetchQueries: [GET_CONTACTS],
        onCompleted: () => navigate(-1),
    });

    const handleSave = (values: ContactForm) => {
        if (!data?.contact_by_pk) return;
        const id = data.contact_by_pk.id;
        const deleted_phones_id: number[] = data.contact_by_pk.phones.reduce(
            (accumulator: number[], phone: Phones) => {
                const findNumber = values.phones.find(
                    (item) => item.id === phone.id
                );
                if (!findNumber) return [...accumulator, phone.id];
                return accumulator;
            },
            []
        );
        const updated_phones = values.phones.map((phone) => ({
            id: phone.id,
            number: phone.number,
            contact_id: id,
        }));

        const variables = {
            id,
            first_name: values.first_name,
            last_name: values.last_name,
            updated_phones,
            deleted_phones_id,
        };

        putContact({ variables });
    };

    return (
        <FormContact
            intialValues={data?.contact_by_pk}
            handleSave={handleSave}
            loading={loading}
        />
    );
};

export default UpdateContact;
