import styled from "styled-components";

export const AboutUserContainer = styled.div`
    display: flex;
    padding: 10px 0;
`

export const AboutUserData = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 50px;
`

export const DetailsUserContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const DetailsUserBar = styled.div`
    display: flex;
    border-top: 1px solid ${props => props.theme.others};
    margin-top: 10px;

    & > a {
        width: 50%;
        text-align: center;
        cursor: pointer;

        &.active {
            font-weight: 400;
            border-top: 1px solid ${props => props.theme.main};
            margin-top: -1px;
        }
    }
`

export const ResultsList = styled.div`
    margin-top: 10px;

`

export const PostContent = styled.div`
    background-color: ${props => props.theme.primary};
    margin: 5px 0;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.others};

`

export const PostAuthor = styled.p`
    color: ${props => props.theme.main};
`

export const PostDate = styled.p`
    text-align: right;
`

export const PostButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const TextInline = styled.p`
    display: flex;
    justify-content: space-between;
`