import styled from '@emotion/styled';
import { useState, ChangeEventHandler, ChangeEvent, useEffect } from 'react';
import { CancelIcon } from '../icons';
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

const Container = styled(ContainerComponent)({
    maxWidth: '500px',
    margin: 'auto',
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
    margin: '60px 0',
});

const AddButton = styled.p({
    textAlign: 'right',
    fontSize: '16px',
    margin: '0px',
    textDecoration: 'underline',
    cursor: 'pointer',
    ' b': { fontSize: '20px' },
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
            [event.target.name]: event.target.value,
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
            phones[index] = { ...phones[index], number: event.target.value };
            return { ...val, phones };
        });
    };

    return (
        <>
            <Header>
                <Title>
                    {intialValues ? 'Edit Contact' : 'Create Contact'}
                </Title>{' '}
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
                <ActionRow>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button onClick={() => handleSave(values)}>Save</Button>
                </ActionRow>
            </Container>
        </>
    );
};

export default FormContact;
