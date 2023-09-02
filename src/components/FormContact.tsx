import styled from '@emotion/styled';
import { useState, ChangeEventHandler, ChangeEvent, useEffect } from 'react';
import {
    Container as ContainerComponent,
    Text,
    Avatar as AvatarComponent,
    Input,
    Button,
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

const ButtonDelete = styled.button({
    fontSize: '22px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
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
    margin: '16px 0',
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
            <Header title={intialValues ? 'Edit Contact' : 'Create Contact'} />
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
                        <ButtonDelete onClick={() => handleDeleteNumber(index)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                height='1em'
                                viewBox='0 0 384 512'
                            >
                                <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
                            </svg>
                        </ButtonDelete>
                    </NumberRow>
                ))}
                <AddButton onClick={handleAddNumber}>
                    {' '}
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
