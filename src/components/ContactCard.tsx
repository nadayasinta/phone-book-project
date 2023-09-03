import styled from '@emotion/styled';
import { Contact } from '../types';
import { Avatar, SubTitle, Text, ButtonIcon } from '../elements';
import {
    FilledStarIcon,
    OutlineStarIcon,
    EditIcon,
    DeleteIcon,
} from '../icons';
import { useState } from 'react';

const Card = styled.div({
    backgroundColor: 'white',
    boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    padding: '16px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    overflow: 'hidden',
    '&:hover': {
        transform: 'scale(1.02)',
    },
});
const CardTitle = styled.div({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});
const CardDetail = styled.div((props) => ({
    display: props.hidden ? 'none' : 'flex',
    flexDirection: 'column',
    gap: '8px',
}));
const CardAction = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
});

interface Props {
    data: Contact;
    isFavorite: boolean;
    handleFavoriteButton: (id: number) => void;
    handleEditButton: (id: number) => void;
    handleDeleteButton: (id: number) => void;
}

const ContactCardComponent = (props: Props) => {
    const {
        data,
        isFavorite,
        handleFavoriteButton,
        handleEditButton,
        handleDeleteButton,
    } = props;
    const [expanded, setExpanded] = useState<boolean>(false);

    const toggleDetails = () => {
        setExpanded(!expanded);
    };

    return (
        <Card onClick={toggleDetails}>
            <CardTitle>
                <Avatar
                    src={`https://api.dicebear.com/7.x/micah/svg?seed=${data.last_name}&radius=50&backgroundType=gradientLinear,solid&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                    alt='avatar'
                    sizes='50px'
                />
                <SubTitle>
                    {data.first_name} {data.last_name}
                </SubTitle>
            </CardTitle>
            {
                <CardDetail hidden={!expanded}>
                    {data.phones.map((phone) => (
                        <Text key={phone.number}>{phone.number}</Text>
                    ))}
                    <CardAction>
                        <ButtonIcon
                            className='border'
                            onClick={() => handleFavoriteButton(data.id)}
                        >
                            {isFavorite ? (
                                <FilledStarIcon />
                            ) : (
                                <OutlineStarIcon />
                            )}
                        </ButtonIcon>
                        <ButtonIcon
                            className='border'
                            onClick={() => handleEditButton(data.id)}
                        >
                            <EditIcon />
                        </ButtonIcon>
                        <ButtonIcon
                            className='border'
                            onClick={() => handleDeleteButton(data.id)}
                        >
                            <DeleteIcon />
                        </ButtonIcon>
                    </CardAction>
                </CardDetail>
            }
        </Card>
    );
};

export default ContactCardComponent;
