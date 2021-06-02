import styled from "styled-components";

export const AboutUser = styled.div`
    width: 100%;
    height: 32px;
    margin: 5px 0;
    
    display: flex;
`
export const Author = styled.p`
    padding: 0 5px;
    color: ${props => props.theme.main};
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
`

export const DateString = styled.p`
    padding: 0 5px;
`
export const PostContent = styled.p`
    margin-top: 10px;
`
