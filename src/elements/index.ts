import styled from '@emotion/styled';

export const Container = styled.div({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

export const Avatar = styled.img((props) => ({
    width: props.sizes,
    height: props.sizes,
}));

export const Title = styled.h1({
    fontSize: '22px',
    fontWeight: '700',
    margin: '0px',
});

export const SubTitle = styled.h2({
    fontSize: '20px',
    fontWeight: '500',
    margin: '0px',
});

export const SectionTitle = styled.h4({
    fontSize: '16px',
    fontWeight: '700',
    margin: '0px',
});

export const Text = styled.p({
    fontSize: '16px',
    margin: '0px',
    '&.disabled': { color: '#7c7d7e' },
    '&.center': { textAlign: 'center' },
});

export const ButtonIcon = styled.button((props) => ({
    background: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    border: 'none',
    padding: '8px 5px 0',
    fontSize: '28px',
    ' &svg': {
        margin: 'auto',
    },
    '&.border': {
        borderRadius: '50%',
        border: 'solid 2px black',
        fontSize: '18px',
        width: '40px',
        height: '40px',
        padding: '5px 5px 0',
    },
    ...(props.disabled && {
        color: '#a3a3a4',
    }),
}));

export const Button = styled.button({
    fontSize: '16px',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '16px 12px',
    border: 'solid 2px black',
    background: 'none',
    cursor: 'pointer',
    width: '100%',
});

export const Divider = styled.hr({
    width: 'calc(100% - 16px)',
    margin: '12px',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 'thin',
});

export const Input = styled.input({
    fontSize: '16px',
    border: 'solid 2px black',
    padding: '12px',
    '&:focus': {
        outline: 'none',
    },
    '&::placeholder': {
        color: 'black',
    },
});
