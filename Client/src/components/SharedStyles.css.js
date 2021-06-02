import styled from "styled-components";

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
