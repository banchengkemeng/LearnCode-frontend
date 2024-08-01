import {Button, Input, Message, Upload} from "@arco-design/web-react";
import {IconUpload} from "@arco-design/web-react/icon";
import "./index.scss"
import {useRef, useState} from "react";

function UploadInput({value, onChange, placeholder}) {
    const inputRef = useRef(null)

    const uploadHandler = {
        init: (fileName) => {
            console.log(`[INIT] ${fileName}`)
        },
        uploading: (fileName) => {
            console.log(`[UPLOADING] ${fileName}`)
            Message.info({
                content: `[${fileName}]正在上传中,请稍候`,
                duration: 500
            })
        },
        done: (fileName) => {
            console.log(`[DONE] fileName`)
            Message.success({
                content: `[${fileName}]上传成功`,
                duration: 600
            })
            onChange(fileName)
        },
        error: (fileName) => {
            console.log(`[ERROR] fileName`)
            Message.error({
                content: `[${fileName}]上传失败`,
                duration: 800
            })
        }
    }

    const onUploadChange = (_, file) => {
        uploadHandler[file.status](file.name)
    }

    return (
        <div className={'upload-input'}>
            <Input ref={inputRef} addBefore={
                <Upload drag multiple={false} showUploadList={false} onChange={onUploadChange}>
                    <Button type={"primary"}><IconUpload /></Button>
                </Upload>
            } value={value} onChange={onChange} placeholder={placeholder||'点击左侧上传文件'}/>
        </div>
    )
}

export default UploadInput