import styled from "styled-components";

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
`

export const PostButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`