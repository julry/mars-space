import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {SizeRatioContextProvider} from '../contexts/SizeRatioContext';
import { useProgress } from '../contexts/ProgressContext';
import { Block } from './shared/Block';
import { Button } from './shared/Button';

const TARGET_WIDTH = 375;
const TARGET_HEIGHT = 677;
export const MIN_MOCKUP_WIDTH = TARGET_WIDTH * 2;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const WrapperInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transform: translate(0, 0);
    font-size: ${({$sizeRatio}) => `calc(12px * ${$sizeRatio})`};
    --font-size_md: ${({$sizeRatio}) => `calc(16px * ${$sizeRatio})`};
    --spacing_x1: ${({$sizeRatio}) => `calc(5px * ${$sizeRatio})`};
    --spacing_x2: ${({$sizeRatio}) => `calc(10px * ${$sizeRatio})`};
    --spacing_x3: ${({$sizeRatio}) => `calc(15px * ${$sizeRatio})`};
    --spacing_x4: ${({$sizeRatio}) => `calc(20px * ${$sizeRatio})`};
    --spacing_x5: ${({$sizeRatio}) => `calc(25px * ${$sizeRatio})`};
    background-color: var(--color-dark-blue);
    
    @media (min-width: ${MIN_MOCKUP_WIDTH}px) {
        overflow: hidden;
        max-width: ${({$sizeRatio}) => `calc(${TARGET_WIDTH}px * ${$sizeRatio} * 2)`};
        max-height: ${({$sizeRatio}) => `calc(${TARGET_HEIGHT}px * ${$sizeRatio})`};
        border: 2px solid #000000;
        box-sizing: content-box;
    }
`;

const CookieWrapper = styled(Block)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    bottom: ${({$sizeRatio}) => $sizeRatio * 220}px;
    padding-top: ${({$sizeRatio}) => $sizeRatio * 10}px;
    padding-bottom: ${({$sizeRatio}) => $sizeRatio * 10}px;
    flex-direction: row;
    gap: var(--spacing_x4);

    & button {
        width: ${({$sizeRatio}) => $sizeRatio * 84}px;
        height: ${({$sizeRatio}) => $sizeRatio * 35}px;
        padding: 0;
        font-size: ${({$sizeRatio}) => $sizeRatio * 12}px;
    }
`;

export function ScreenTemplate(props) {
    const [hasCookie, setHasCookie] = useState(false);
    const { children } = props;
    const {currentScreen} = useProgress();
    const wrapperRef = useRef();
    const wrapperInnerRef = useRef();

    const handleCookie = () => {
        localStorage.setItem('mars_ft_cookie', true);
        setHasCookie(false);
    }

    useEffect(() => {
        setHasCookie(!localStorage.getItem('mars_ft_cookie'));
    }, []);

    return (
        <SizeRatioContextProvider target={wrapperInnerRef} targetWidth={TARGET_WIDTH} targetHeight={TARGET_HEIGHT}>
            {(sizeRatio) => (
                <Wrapper ref={wrapperRef}>
                    <WrapperInner ref={wrapperInnerRef}>
                        <Content $sizeRatio={sizeRatio} $shouldUseTransparent={currentScreen?.toLowerCase()?.includes('level')}>
                            {children}
                            {hasCookie && (
                                <CookieWrapper $sizeRatio={sizeRatio}>
                                    <p>Мы используем куки. Играя, ты соглашаешься с этим</p>
                                    <Button onClick={handleCookie} shouldShowElements={false}>Окей</Button>
                                </CookieWrapper>
                            )}
                        </Content>
                    </WrapperInner>
                </Wrapper>
            )}
        </SizeRatioContextProvider>
    );
};
