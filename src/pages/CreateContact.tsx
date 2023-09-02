import { ContactForm } from '../types';
import FormContact from '../components/FormContact';
import { useMutation } from '@apollo/client';
import { POST_CONTACT } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';

const CreateContact = () => {
    const navigate = useNavigate();
    const [postContact] = useMutation(POST_CONTACT);

    const handleSave = async (values: ContactForm) => {
        try {
            const variables = {
                ...values,
                phones: values.phones.map((phone) => ({
                    number: phone.number,
                })),
            };
            await postContact({ variables });
            navigate(-1);
        } catch (error) { }
    };

    return <FormContact handleSave={handleSave} />;
};

export default CreateContact;
