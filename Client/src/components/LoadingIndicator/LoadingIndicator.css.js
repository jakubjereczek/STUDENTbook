import styled, { keyframes } from 'styled-components';


const move = keyframes`
  0% {
    transform: translate(0, 0)
  }
  25% {
    transform: translate(100%, 0)
  }

  50% {
    transform: translate(100%, 100%)
  }

  75% {
    transform: translate(0, 100%)
  }
`;

const rotate = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.95);
    }
    
`

export const IndicatorContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const Indicator = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 64px;
    height: 64px;

    & > * {
        width: 50%;
        height: 50%;
        background-color: ${props => props.theme.others};
        animation: ${rotate} .3s infinite;

        &:nth-of-type(1) {
            border: 8px solid ${props => props.theme.secodary};
        }
        &:nth-of-type(2) {
            border: 6px solid ${props => props.theme.secodary};
        }
        &:nth-of-type(4) {
            border: 4px solid ${props => props.theme.secodary};
        }
        &:nth-of-type(3) {
            border: 2px solid ${props => props.theme.secodary};
        }
    }
}`;

export const HideShadowElement = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    border: 2px solid ${props => props.theme.secodary};
    background-color: ${props => props.theme.main};
    animation: ${move} 2s steps(1,end) infinite;

`;
