import MdEditor from "@/components/MdEditor";
import CodeEditor from "@/components/CodeEditor";
import {Button, Form, Input, InputTag, Space} from "@arco-design/web-react";
import {IconDelete} from "@arco-design/web-react/icon";
import UploadInput from "@/components/UploadInput";
import "./index.scss"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const FormItem = Form.Item

function BaseQuestion({defaultValue, title, onSubmit}) {
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(defaultValue)
    }, [defaultValue])

    const navigate = useNavigate()
    const onQuestionSubmit = async (v) => {
        await onSubmit(v)
        navigate('/questionManager')
    }

    return (
        <div className={'base-question'}>
            <h1>{title}</h1>
            <Form layout={"vertical"} labelAlign={'left'} className={'base-question-form'} onSubmit={onQuestionSubmit}
                  form={form} autoComplete='off'>
                <FormItem label='标题' field={'title'}>
                    <Input placeholder='请输入标题'/>
                </FormItem>
                <FormItem label='标签' field={'tags'}>
                    <InputTag allowClear placeholder={'请输入标签,按回车分割标签'}/>
                </FormItem>
                <FormItem label='题目描述' field={'content'}>
                    <MdEditor/>
                </FormItem>
                <FormItem label='输入描述' field={'inputDescription'}>
                    <MdEditor/>
                </FormItem>
                <FormItem label='输出描述' field={'outputDescription'}>
                    <MdEditor/>
                </FormItem>
                <FormItem label='输入样例' field={'inputSample'}>
                    <MdEditor/>
                </FormItem>
                <FormItem label='输出样例' field={'outputSample'}>
                    <MdEditor/>
                </FormItem>
                <FormItem label='提示' field={'hint'}>
                    <MdEditor/>
                </FormItem>
                <FormItem label='答案' field={'answer'}>
                    <CodeEditor/>
                </FormItem>
                <FormItem label='判题配置'>
                    <FormItem field={'judgeConfig.timeLimit'}>
                        <Input
                            type={'number'}
                            addBefore={'时间限制'}
                            suffix={'MS'}
                            placeholder='请输入时间限制'
                        />
                    </FormItem>
                    <FormItem field={'judgeConfig.memoryLimit'}>
                        <Input
                            type={"number"}
                            addBefore={'内存限制'}
                            suffix={'MB'}
                            placeholder='请输入内存限制'
                        />
                    </FormItem>
                </FormItem>
                <FormItem label='判题样例'>
                    <Form.List
                        rules={[
                            {
                                validator(v, cb) {
                                    if (v?.length < 1) {
                                        return cb('至少一组判题样例');
                                    }
                                    return cb();
                                },
                            },
                        ]}
                        field={'judgeCase'}
                    >
                        {(fields, {add, remove, move}) => {
                            return (
                                <div>
                                    {fields.map((item, index) => {
                                        return (
                                            <div key={item.key}>
                                                <FormItem>
                                                    <Space>
                                                        <FormItem noStyle field={`judgeCase[${index}].inputCaseFile`}>
                                                            <UploadInput placeholder={'点击左侧上传输入样例文件'}/>
                                                        </FormItem>
                                                        <FormItem noStyle field={`judgeCase[${index}].outputCaseFile`}>
                                                            <UploadInput placeholder={'点击左侧上传输出样例文件'}/>
                                                        </FormItem>
                                                        <Button
                                                            icon={<IconDelete/>}
                                                            shape='circle'
                                                            status='danger'
                                                            onClick={() => remove(index)}
                                                        ></Button>
                                                    </Space>
                                                </FormItem>
                                            </div>
                                        )
                                    })}
                                    <Form.Item>
                                        <Space size={5}>
                                            <Button type={'primary'} status={'success'} onClick={() => {
                                                add();
                                            }}>
                                                新增判题样例
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </div>
                            )
                        }}
                    </Form.List>
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType={'submit'} long>Submit</Button>
                </FormItem>
            </Form>
        </div>
    )
}

export default BaseQuestion