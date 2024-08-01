import BaseQuestion from "@/components/BaseQuestion";
import {addQuestion} from "@/apis/question";

function AddQuestion() {
    const onSubmit = async (value) => {
        await addQuestion(value)
    }

    return (
        <div className={'add-question'}>
            <BaseQuestion title={'创建题目'} onSubmit={onSubmit} />
        </div>
    )
}

export default AddQuestion