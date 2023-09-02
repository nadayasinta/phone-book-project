import styled from '@emotion/styled';

export const Avatar = styled.img((props) => ({
    width: props.sizes,
    height: props.sizes,
}));

export const Title = styled.h1({
    fontSize: '20px',
    fontWeight: '700',
    margin: '0px',
});

export const SubTitle = styled.h2({
    fontSize: '18px',
    fontWeight: '500',
    margin: '0px',
});

export const SectionTitle = styled.h4({
    fontSize: '14px',
    fontWeight: '700',
    margin: '0px',
});

export const Text = styled.p({
    fontSize: '14px',
    margin: '0px',
});

export const Button = styled.button({
    fontSize: '18px',
    fontWeight: '500',
    color: 'white',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    ' &svg': {
        margin: 'auto',
    },
    border: 'solid 2px black',
    background: 'none',
});

export const Divider = styled.hr({
    width: 'calc(100% - 16px)',
    margin: '8px',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 'thin',
});
