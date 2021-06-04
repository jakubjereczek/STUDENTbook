import styled from "styled-components";
import User from '../assets/images/user.png';

export const Title = styled.div`
    font-weight: 400;
    font-size: 1.8rem;
    color: ${props => props.theme.color};

`
export const Subtitle = styled.div`
    font-weight: 200;
    font-size: 1;
    color: ${props => props.theme.color};

    & > span {
        color: ${props => props.theme.main};
    }
`

export const Text = styled.p`
    color: ${props => props.theme.color};
`;

export const Logo = styled.h2`
    display: inline-block;
    width: auto;
    font-weight: 300;
    text-align: center;
    color: ${props => props.theme.color};

    & > span {
        font-weight: 400;
    }
`

export const ContainerInside = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    border: 1px solid ${props => props.theme.others};
    background-color: ${props => props.theme.primary};
    padding: 10px;
    margin: 5px 0;
`

export const UserIcon = styled.div`
    width: 32px;
    height: 32px;
    background-size: 100%;
    background-image: url(${User});
    background-repeat: no-repeat;
`

export const UserIconLarge = styled(UserIcon)`
    width: 128px;
    height: 128px;
`

export const Input = styled.input`
    padding: 10px;
    margin: 5px 0;
    border: 1px solid ${props => props.theme.others};
    background-color: ${props => props.theme.secodary};
    color: ${props => props.theme.color};
`

export const Select = styled.select`
    padding: 10px;
    margin: 5px 0;
    border: 1px solid ${props => props.theme.others};
`

export const TextArea = styled.textarea`
    padding: 10px;
    margin: 5px 0;
    border: 1px solid ${props => props.theme.others};
    resize: none;
    min-height: 100px;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.secodary};
`

export const Button = styled.button`
    padding: 10px;
    color: ${props => props.theme.details};
    background-color: ${props => props.theme.secodary};
    border: 0;
    transition: 0.3s;
    cursor: pointer;
    color: ${props => props.theme.color};


    &:hover {
        background-color: ${props => props.theme.main};
    }
`
export const Author = styled.p`
    padding: 0 5px;
    color: ${props => props.theme.main};
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
`
export const ButtonIcon = styled.span`
    transition: 0.3s;
    margin: 0px 5px;
    color: ${props => props.theme.color};

    &:hover {
        color: ${props => props.theme.main};
    }
    cursor: pointer;
`

export const Label = styled.label`
    color: ${props => props.theme.color};
`

