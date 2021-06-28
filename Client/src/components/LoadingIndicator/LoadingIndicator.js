import { IndicatorContainer, Indicator, Dots, HideShadowElement } from './LoadingIndicator.css';

const LoadingIndicator = () => {

    return (
        <IndicatorContainer>
            <Indicator>
                <div></div><div></div><div></div><div></div>
                <HideShadowElement />
            </Indicator>

        </IndicatorContainer>
    )

}

export default LoadingIndicator;