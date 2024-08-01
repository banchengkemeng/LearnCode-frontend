import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getLangList, getQuestion} from "@/apis/question";
import {Button, Card, Descriptions, Form, Grid, Input, Message, Select, Space, Tabs, Tag} from "@arco-design/web-react";
import Paragraph from "@arco-design/web-react/es/Typography/paragraph";
import Title from "@arco-design/web-react/es/Typography/title";
import {Viewer} from "@bytemd/react";
import "./index.scss";
import CodeEditor from "@/components/CodeEditor";
import {submitQuestion} from "@/apis/submit";
import SubmitRecord from "@/pages/QuestionSubmit/record";

const TabPane = Tabs.TabPane
const Option = Select.Option

function QuestionSubmit() {
    const params = useParams()

    const [langList, setLangList] = useState([])
    const [data, setData] = useState({})
    useEffect(() => {
        const getQuestionAsync = async () => {
            const res = await getQuestion(params.id)
            setData(res.data)
        }
        const getLangListAsync = async () => {
            const res = await getLangList()
            setLangList(res.data)
        }
        getQuestionAsync()
        getLangListAsync()
    }, [params.id])

    const [descriptionArr, setDescriptionArr] = useState([])
    useEffect(() => {
        setDescriptionArr([
            {
                label: '时间限制',
                value: data?.judgeConfig?.timeLimit
            },
            {
                label: '内存限制',
                value: data?.judgeConfig?.memoryLimit
            },
            {
                label: '标签',
                value: (
                    <Space>
                        {data.tags?.map(tag => <Tag key={tag} color='blue' bordered>{tag}</Tag>)}
                    </Space>
                )
            }
        ])
    }, [data]);

    const [lang, setLang] = useState('cpp')
    const onLangChange = (lang) => {
        setLang(lang)
    }

    const onSubmit = async (value) => {
        const res = await submitQuestion(value)
        if (res.code === 0) {
            Message.success({
                content: '提交成功, 等待评测',
                duration: 800
            })
            window.location.reload()
        }
    }

    return (
        <Grid.Row className={'question-detail'}>
            <Grid.Col>
                <Card title={data.title} className={'content'}>
                    <Tabs defaultActiveTab={'1'} >
                        <TabPane key={'1'} title={'题目'}>
                            <Descriptions border data={descriptionArr}/>
                            <Title heading={5}>题目描述</Title>
                            <Paragraph>
                                <Viewer value={data.content}/>
                            </Paragraph>
                            <Title heading={5}>输入描述</Title>
                            <Paragraph>
                                <Viewer value={data.inputDescription}/>
                            </Paragraph>
                            <Title heading={5}>输出描述</Title>
                            <Paragraph>
                                <Viewer value={data.outputDescription}/>
                            </Paragraph>
                            <Title heading={5}>输入样例</Title>
                            <Paragraph>
                                <Viewer value={data.inputSample}/>
                            </Paragraph>
                            <Title heading={5}>输出样例</Title>
                            <Paragraph>
                                <Viewer value={data.outputSample}/>
                            </Paragraph>
                            <Title heading={5}>提示</Title>
                            <Paragraph>
                                <Viewer value={data.hint}/>
                            </Paragraph>
                            <Title heading={5}>提交代码</Title>
                            <Paragraph>
                                <Card className={'code'}>
                                    <Form onSubmit={onSubmit} initialValues={{questionId: params.id}}>
                                        <Form.Item field={'questionId'} hidden>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item field={'lang'}>
                                            <Select
                                                placeholder={'请选择编程语言'}
                                                addBefore={'编程语言'}
                                                defaultValue={"cpp"}
                                                onChange={onLangChange}>
                                                {langList.map((item, index) => <Option key={index} value={item}/>)}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item field={'code'}>
                                            <CodeEditor language={lang} className={'code-editor'}/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button htmlType={"submit"} type={"primary"} long>提交代码</Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Paragraph>
                        </TabPane>
                        <TabPane key={'2'} title={'答案'} disabled/>
                        <TabPane key={'3'} title={'提交记录'}>
                            <SubmitRecord questionId={params.id}></SubmitRecord>
                        </TabPane>
                    </Tabs>
                </Card>
            </Grid.Col>
        </Grid.Row>
    )
}

export default QuestionSubmit