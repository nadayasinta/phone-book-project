import styled from '@emotion/styled';
import { useState, ChangeEventHandler, ChangeEvent, useEffect, useMemo } from 'react';
import { CancelIcon, ErrorIcon } from '../icons';
import {
    Container as ContainerComponent,
    Text,
    Avatar as AvatarComponent,
    Input,
    Button,
    ButtonIcon,
    Title,
} from '../elements';
import { ContactForm, Contact } from '../types';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GetContacts } from '../types';
import { GET_CONTACTS } from '../graphql/query';

const Container = styled(ContainerComponent)({
    maxWidth: '500px',
    margin: 'auto',
    gap: '20px',
});

const Avatar = styled(AvatarComponent)({
    margin: '0 auto 16px',
});

const InputNumber = styled(Input)({
    flexGrow: 1,
});

const NumberRow = styled.div({
    display: 'flex',
    gap: '4px',
});

const ActionRow = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '16px',
    marginBottom: '60px',
});

const AddButton = styled.p({
    textAlign: 'right',
    fontSize: '18px',
    margin: '0px',
    textDecoration: 'underline',
    cursor: 'pointer',
    ' b': { fontSize: '20px' },
});

const ErrorRow = styled.div({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '40px',
    ' svg': { color: '#7A0404', fontSize: '32px', minWidth: '32px' },
});

interface Props {
    intialValues?: Contact;
    handleSave: (values: ContactForm) => void;
}

const FormContact = (props: Props) => {
    const { intialValues, handleSave } = props;
    const navigate = useNavigate();
    const [values, setValues] = useState<ContactForm>({
        first_name: '',
        last_name: '',
        phones: [],
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [getContactWithSameName] = useLazyQuery<GetContacts>(GET_CONTACTS, {
        variables: {
            where: {
                first_name: { _ilike: values.first_name },
                last_name: { _ilike: values.last_name },
                ...(intialValues && { id: { _neq: intialValues.id } }),
            },
        },
    });

    const disabledSaveButton: boolean = useMemo(() => {
        return !(values.first_name && values.last_name && values.phones.every(phone => phone.number))
    }, [values])

    useEffect(() => {
        if (intialValues) {
            setValues({
                first_name: intialValues?.first_name,
                last_name: intialValues?.last_name,
                phones: [...intialValues?.phones],
            });
        }
    }, [intialValues]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValues((val) => ({
            ...val,
            [event.target.name]: event.target.value.replace(
                /[^A-Za-z0-9\s]/gi,
                ''
            ),
        }));
    };

    const handleAddNumber = () => {
        setValues((val) => {
            const phones = [...val.phones, { number: '' }];
            return { ...val, phones };
        });
    };

    const handleDeleteNumber = (index: number) => {
        setValues((val) => {
            const phones = [...val.phones];
            phones.splice(index, 1);
            return { ...val, phones };
        });
    };

    const handleChangeNumber = (
        event: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        setValues((val) => {
            const phones = [...val.phones];
            phones[index] = {
                ...phones[index],
                number: event.target.value.replace(/[^0-9+]/gi, ''),
            };
            return { ...val, phones };
        });
    };

    const handleSaveButton = async () => {
        try {
            const contactWithSameName = await getContactWithSameName();
            console.log(contactWithSameName);
            if (contactWithSameName?.data?.contact.length) {
                setErrorMessage('Contact name already exists');
                return;
            }
            await handleSave(values);
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <>
            <Header>
                <Title>
                    {intialValues ? 'Edit Contact' : 'Create Contact'}
                </Title>
            </Header>
            <Container>
                <Avatar
                    src={`https://api.dicebear.com/7.x/micah/svg?seed=${intialValues?.last_name || 'user'
                        }&radius=50&backgroundType=gradientLinear,solid&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                    alt='avatar'
                    sizes='80px'
                ></Avatar>
                <Text>First Name</Text>
                <Input
                    value={values.first_name}
                    name='first_name'
                    onChange={handleChange}
                />
                <Text>Last Name</Text>
                <Input
                    value={values.last_name}
                    name='last_name'
                    onChange={handleChange}
                />
                <Text>Phone</Text>
                {values.phones.map((phone, index) => (
                    <NumberRow key={index}>
                        <InputNumber
                            value={phone.number}
                            name='number'
                            onChange={(event) =>
                                handleChangeNumber(event, index)
                            }
                        />
                        <ButtonIcon onClick={() => handleDeleteNumber(index)}>
                            <CancelIcon />
                        </ButtonIcon>
                    </NumberRow>
                ))}
                <AddButton onClick={handleAddNumber}>
                    <b>+</b> Add New
                </AddButton>
                <ErrorRow>
                    {errorMessage && (
                        <>
                            <ErrorIcon /> <Text>{errorMessage}</Text>
                        </>
                    )}
                </ErrorRow>
                <ActionRow>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button onClick={handleSaveButton} disabled={disabledSaveButton}>Save</Button>
                </ActionRow>
            </Container>
        </>
    );
};

export default FormContact;
