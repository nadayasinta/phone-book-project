import { ContactForm, PostContact } from '../types';
import FormContact from '../components/FormContact';
import { useMutation } from '@apollo/client';
import { POST_CONTACT } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import { GET_TOTAL_CONTACT, GET_CONTACTS } from '../graphql/query';

const CreateContact = () => {
    const navigate = useNavigate();
    const [postContact] = useMutation<PostContact>(POST_CONTACT, {
        refetchQueries: [GET_CONTACTS, GET_TOTAL_CONTACT],
        onCompleted: () => navigate(-1),
    });

    const handleSave = (values: ContactForm) => {
        const variables = {
            ...values,
            phones: values.phones.map((phone) => ({
                number: phone.number,
            })),
        };
        postContact({ variables });
    };

    return <FormContact handleSave={handleSave} />;
};

export default CreateContact;
