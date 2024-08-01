import {Button, Table, Tag} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {getSubmitRecordList} from "@/apis/submit";
import {useSelector} from "react-redux";
import {sleep} from "@/utils";
function SubmitRecord({questionId}) {
    const statusToTag = (value, status) => {
        const mapColor = (status) => {
            switch (status) {
                case 'Waiting': return '#0fc6c2';
                case 'Accepted': return '#00b42a';
                case 'Wrong Answer': return '#ff5722';
                case 'Exec Error': return '#ffb400';
                default: return '#ff7d00'
            }
        }
        return (
            <Tag color={mapColor(status)} bordered>{value}</Tag>
        )
    }

    const onClickRecordDetail = (record) => {
        console.log(record)
    }

    const columns = [
        {
            title: '记录ID',
            dataIndex: 'id',
        },
        {
            title: '状态',
            dataIndex: 'judgeInfo',
            render: (_, { judgeInfo }) => (
                <div>{statusToTag(judgeInfo.message, judgeInfo.status)}</div>
            )
        },
        {
            title: '编程语言',
            dataIndex: 'lang',
        },
        {
            title: '操作',
            dataIndex: 'opt',
            render: (_, record) => (
                <Button type={"primary"} size={"mini"} onClick={() => onClickRecordDetail(record)}>
                    查看详情
                </Button>
            )
        },
    ];

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const loadData = async (page, params= {}) => {
        const {current, pageSize} = page
        setLoading(true);
        const res = await getSubmitRecordList({
            ...params,
            current,
            pageSize
        })
        const data = res.data
        setData(data.records)
        setPagination({...pagination, current, pageSize, total: data.total})
        setLoading(false)
        return data.records
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

    // 轮询提交记录，直到全部判题都已完成
    const updateIfExistsUnFinished = () => {
        const checkFinished = (records) => {
            for (let record of records) {
                console.log('record: ', record)
                const finished = record['judgeInfo']['finished']
                if (!finished) {
                    return false;
                }
            }
            return true;
        }

        const interval = setInterval(() => {
            loadData(pagination, {
                questionId,
                userId: loginUser.id
            }).then((records) => {
                if (checkFinished(records)) {
                    clearInterval(interval)
                }
            })
        }, 3000)
    }

    const { loginUser } = useSelector(state => state.user)

    useEffect( () => {
        loadData(pagination, {
            questionId,
            userId: loginUser.id
        }).then(() => {
            updateIfExistsUnFinished()
        });

    }, [])

    const onChangeTable = async (pagination) => {
        loadData(pagination)
    }

    return (
        <Table
            loading={loading}
            showHeader
            stripe
            columns={columns}
            data={data}
            pagination={pagination}
            onChange={onChangeTable}
        />
    )
}

export default SubmitRecord