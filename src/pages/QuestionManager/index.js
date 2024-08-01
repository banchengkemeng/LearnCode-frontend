import {Button, Divider, Form, Input, InputTag, Space, Table, Tag} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {deleteQuestionAdmin, getQuestionAdminList} from "@/apis/question";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import useForm from "@arco-design/web-react/es/Form/useForm";

function QuestionManager() {
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
            title: '时间限制',
            dataIndex: 'judgeConfig.timeLimit',
            render: (_, record) => `${record?.judgeConfig?.timeLimit} MS`
        },
        {
            title: '内存限制',
            dataIndex: 'judgeConfig.memoryLimit',
            render: (_, record) => `${record?.judgeConfig?.memoryLimit} MB`
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
                        <Button type={"primary"} size={"mini"} onClick={() => onDetail(record.id)}>查看</Button>
                        <Button type={"primary"} status={"success"} size={"mini"}
                                onClick={() => onEdit(record.id)}>编辑</Button>
                    </Space>
                </div>

            )
        }
    ];

    const loadData = async (page, params={}) => {
        const {current, pageSize} = page
        setLoading(true);
        const res = await getQuestionAdminList({
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


    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
    }

    const navigate = useNavigate()
    const onDetail = (id) => {
        navigate(`/questions/${id}`)
    }

    const onEdit = (id) => {
        navigate(`/questionManager/edit?id=${id}`)
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

    const onCreate = () => {
        navigate('/questionManager/add')
    }

    const onDelete = async () => {
        await deleteQuestionAdmin(selectedRowKeys)
        loadData(pagination)

    }

    const onSearch = (value) => {
        console.log(value)
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
            <Space>
                <Button size={"large"} type={"primary"} onClick={onCreate}>创建题目</Button>
                <Button size={"large"} type={"primary"} status={"danger"} onClick={onDelete}>删除题目</Button>
            </Space>
            <Divider/>
            <Table
                loading={loading}
                showHeader
                rowKey={'id'}
                stripe
                columns={columns}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: onSelectedRowKeysChange
                }}
                data={data}
                pagination={pagination}
                onChange={onChangeTable}
            />
        </div>
    )
}

export default QuestionManager