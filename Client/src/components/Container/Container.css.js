import styled from "styled-components";

export const ContainerWrapper = styled.div`
    background-color: ${props => props.theme.secodary};
    min-width: 300px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* overflow: hidden; */
`

export const Menu = styled.div`
    height: 60px;
    line-height: 60px;
    width: 100%;
    background-color: ${props => props.theme.primary};
    border-bottom: 1px solid ${props => props.theme.others};
    display: flex;
    justify-content: center;
    padding: 0 5px;
`

export const Content = styled.div`
    width: 100%;
    /* height: calc(100% - 120px); */
    min-height: calc(100vh - 120px);
    display: flex;
    justify-content: center;
    padding: 5px;
`

export const ContainerInside = styled.div`
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const MenuInside = styled(ContainerInside)`
    flex-direction: row;
    justify-content: space-between;
`
export const Footer = styled.footer`
    background-color: ${props => props.theme.primary};
    border-top: 1px solid ${props => props.theme.others};
    height: 60px;
    line-height: 60px;
    text-align: center;
`