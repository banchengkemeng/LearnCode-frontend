import {Button, Divider, Form, Input, InputTag, Space, Table, Tag} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {getQuestionList} from "@/apis/question";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import useForm from "@arco-design/web-react/es/Form/useForm";

function QuestionBrowser() {
    const [form] = useForm()
    const [data, setData] = useState([])
    const columns = [
        {
            title: '题号',
            dataIndex: 'id',
        },
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '标签',
            dataIndex: 'tags',
            render: (_, record) => (
                <Space>
                    {record.tags.map((item, index) => <Tag size={"small"} bordered color='blue'
                                                           key={index}>{item}</Tag>)}
                </Space>
            )
        },
        {
            title: '提交数',
            dataIndex: 'submitNum'
        },
        {
            title: '通过数',
            dataIndex: 'acceptedNum'
        },
        {
            title: '操作',
            render: (_, record) => (
                <div>
                    <Space>
                        <Button type={"primary"} size={"mini"} onClick={() => onDetail(record.id)}>
                            去做题
                        </Button>
                    </Space>
                </div>

            )
        }
    ];

    const loadData = async (page, params={}) => {
        const {current, pageSize} = page
        setLoading(true);
        const res = await getQuestionList({
            ...params,
            current,
            pageSize
        })
        const data = res.data
        setData(data.records)
        setPagination({...pagination, current, pageSize, total: data.total})
        setLoading(false)
    }

    useEffect(() => {
        loadData(pagination)
    }, [])

    const navigate = useNavigate()

    const onDetail = (id) => {
        navigate(`/questions/${id}`)
    }

    const [pagination, setPagination] = useState({
        size: 'small',
        showTotal: true,
        showJumper: true,
        sizeCanChange: true,
        total: 100,
        current: 1,
        pageSize: 10,
        pageSizeChangeResetCurrent: true,
        sizeOptions: [5, 10, 15, 20, 50, 100]
    })
    const [loading, setLoading] = useState(false)
    const onChangeTable = async (pagination) => {
        loadData(pagination)
    }

    const onSearch = (value) => {
        loadData(pagination, value)
    }

    const onReset = () => {
        form.resetFields()
    }
    return (
        <div>
            <Form form={form} onSubmit={onSearch} layout={"inline"} className={'question-form'}>
                <Space direction={"horizontal"}>
                    <Form.Item label={'标题'} field={'title'}>
                        <Input className={'input'} placeholder={'请输入标题'} />
                    </Form.Item>
                    <Form.Item label={'标签'} field={'tags'}>
                        <InputTag className={'input'} allowClear placeholder={'请输入标签，按下回车键分割标签'} />
                    </Form.Item>
                </Space>
                <Form.Item>
                    <Divider type={"vertical"} />
                </Form.Item>
                <Form.Item>
                    <Space direction={"horizontal"}>
                        <Button htmlType={'submit'} type={"primary"}>查询</Button>
                        <Button onClick={onReset}>重置</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Divider/>
            <Table
                loading={loading}
                showHeader
                stripe
                columns={columns}
                data={data}
                pagination={pagination}
                onChange={onChangeTable}
            />
        </div>
    )
}

export default QuestionBrowser