import BaseQuestion from "@/components/BaseQuestion";
import {editQuestion, getQuestionAdmin} from "@/apis/question";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

function EditQuestion() {

    const [params] = useSearchParams()

    const [data, setData] = useState({})
    const loadData = async () => {
        const id = params.get('id')
        const question = await getQuestionAdmin(id)
        setData(question.data)
    }

    useEffect(() => {
        loadData()
    }, [])

    const onSubmit = async (value) => {
        await editQuestion({
            ...value,
            id: data.id
        })
    }

    return (
        <div className={'edit-question'}>
            <BaseQuestion defaultValue={data} title={'编辑题目'} onSubmit={onSubmit} />
        </div>
    )
}

export default EditQuestion