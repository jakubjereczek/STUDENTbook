import styled from "styled-components";
import { Button } from '../../../components/SharedStyles.css'
export const AboutUser = styled.div`
    width: 100%;
    height: 32px;
    margin: 5px 0;
    
    display: flex;
`

export const DateString = styled.p`
    padding: 5px 0;
    text-align: right;
    color: ${props => props.theme.color};

`
export const PostContent = styled.p`
    margin-top: 10px;
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

    &:hover, &.active {
        font-weight: 400;
    }

`

export const UniversityTag = styled.span`
    display: inline-block;
    border: 1px solid ${props => props.theme.main};
    color:${props => props.theme.main};
    padding: 0 5px;
    margin-bottom: 5px;
    border-radius: 10px;
`
export const AboutUserHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`