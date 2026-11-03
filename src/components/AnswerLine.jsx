import Button from "./Button";
function AnswerLine({ text, ...rest }) {
    return (
        <div className="answer-line">
            <Button {...rest}>{text}</Button>
        </div>
    );
}

export default AnswerLine;
