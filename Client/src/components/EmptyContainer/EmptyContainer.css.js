import styled from "styled-components";

export const ContainerWrapper = styled.div`
    background-color: ${props => props.theme.secodary};
    min-width: 300px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
`

export const Content = styled.div`
    max-width: 900px;
    width: 100%;

`