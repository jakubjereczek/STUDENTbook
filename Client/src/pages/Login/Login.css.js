import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`
export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 50px;
    width: 100%;
    max-width: 400px;
    border: 1px solid ${props => props.theme.others};
    background-color: ${props => props.theme.primary};
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 10px;

;`
