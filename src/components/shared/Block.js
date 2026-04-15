import styled from 'styled-components';
import { useSizeRatio } from '../../contexts/SizeRatioContext';


const Wrapper = styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #fff;
    padding: ${({$ratio}) => $ratio * 26}px;
    max-width: ${({$ratio}) => $ratio * 335}px;

    &::after, &::before {
        content: '';
        position: absolute;
        width: 7px;
        height: 60px;
        background-color: var(--color-accent);
    }

    &::after {
        bottom: 0;
        right: 0;
    }
    &::before {
        top: 0;
        left: 0;
    }
`;

export const Block = (props) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper 
            $ratio={ratio} 
            {...props}
        >
            {props.children}
        </Wrapper>
    )
}
