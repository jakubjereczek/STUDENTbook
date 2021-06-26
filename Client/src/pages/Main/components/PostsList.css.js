import styled from "styled-components";
import { Button } from '../../../components/SharedStyles.css'
export const AboutUser = styled.div`
    width: 100%;
    height: 32px;
    margin: 5px 0;
    
    display: flex;
`

export const DateString = styled.p`
    padding: 0 5px;
    color: ${props => props.theme.color};

`
export const PostContent = styled.p`
    margin-top: 10px;
    word-wrap: break-word;
`

export const PostButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const ChoiceButtonsContainer = styled.div`
    display: flex;
`

export const ChoiceButton = styled(Button)`
    flex-basis: 50%;
    background-color: ${props => props.theme.main};
    color: ${props => props.theme.color};

    &:hover {
        font-weight: 400;
    }
`