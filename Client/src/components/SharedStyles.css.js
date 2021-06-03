import styled from "styled-components";
import User from '../assets/images/user.png';

export const Title = styled.div`
    font-weight: 400;
    font-size: 1.8rem;
`
export const Subtitle = styled.div`
    font-weight: 200;
    font-size: 1;

    & > span {
        color: ${props => props.theme.main};
    }
`

export const Logo = styled.h2`
    display: inline-block;
    width: auto;
    font-weight: 300;
    text-align: center;
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
`

export const Input = styled.input`
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
`

export const Button = styled.button`
    padding: 10px;
    color: ${props => props.theme.details};
    background-color: ${props => props.theme.secondary};
    border: 0;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.main};
        color: ${props => props.theme.primary};
    }
`

