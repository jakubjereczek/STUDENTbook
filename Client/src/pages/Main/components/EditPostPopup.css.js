import styled from "styled-components";

export const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Popup = styled.div`
    position: relative;
    max-width: 900px;
    width: 100%;
    background-color: ${props => props.theme.primary};
    border: 1px solid ${props => props.theme.others};
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
`

export const ClosePopup = styled.div`
    position: absolute;
    right: 5px;
`;