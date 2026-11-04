import Button from "../../../components/Button";

function AnswerOption({ text, ...buttonProps }) {
    return (
        <div className="answer-line">
            <Button {...buttonProps}>{text}</Button>
        </div>
    );
}

export default AnswerOption;
