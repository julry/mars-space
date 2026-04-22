import { useState } from "react"
import styled from "styled-components";
import { Modal } from "../../../shared/Modal";
import { CORRECT_COLOR, ERROR_COLOR, questions } from "./constants";
import {Block} from '../../../shared/Block';
import {Button} from '../../../shared/Button';
import {media} from '../../../../constants/media';
import { useSizeRatio } from "../../../../contexts/SizeRatioContext";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    align-items: center;
    padding-bottom: var(--spacing_x5);
    gap: var(--spacing_x2);

    & > div {
        width: 100%;

        &::after {
            display: none;
        }

        &::before {
            height: 100%;
        }
    }
`;

const AnswerButton = styled(Button)`
    font-size: ${({$ratio}) => $ratio * 12}px;
    background: ${({$bg}) => $bg ?? 'var(--color-blue)'};
    text-transform: none;
    transition: background 0.3s;
    white-space: pre-line;


    @media (hover:hover) {
        &:hover {
            background: ${({$bg}) => $bg ?? 'var(--color-accent)'};

            &::before {
                transition: background 0.3s;
                ${({$bg}) => $bg ? '' : 'background-color: white'};
            }
        }
    } 
`;

export const QuestionInteractive = ({id, onAnswerWrong, onPlay}) => {
    const [answered, setAnswered] = useState();
    const ratio = useSizeRatio();
    const question = questions.find((q) => q.id === id);

    if (!question) {
        return;
    };

    const handleAnswer = (answer) => {
        if (answered?.isCorrect) {
            return;
        }

        setAnswered(answer);

        if (answer.isCorrect) {
            setTimeout(() => {
                onPlay?.()
            }, 300);
        } else {
            onAnswerWrong?.();
        }
    }

    const getButtonBg = (answer) => {
        if (!answered || answered.id !== answer.id) {
            return
        }

        return answer.isCorrect ? CORRECT_COLOR : ERROR_COLOR;
    }

    return (
        <Modal isOpen isDarken={false} isCentered={false}>
            <Wrapper>
                <Block zIndex={10}>
                    <p> 
                        <b>
                            {question.text}
                        </b>
                    </p>
                </Block>
                {
                    question.answers.map((answer) => (
                        <AnswerButton key={answer.id} $ratio={ratio} $bg={getButtonBg(answer)} onClick={() => handleAnswer(answer)}>
                            {answer.text}
                        </AnswerButton>
                    ))
                }
            </Wrapper>
        </Modal>
    )
}