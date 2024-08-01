import MonacoEditor from "react-monaco-editor"
import "./index.scss"

function CodeEditor({value, onChange, height, language}) {
    return (
        <div>
            <MonacoEditor
                value={value}
                height={height || 400}
                language={language||'cpp'}
                theme="vs-dark"
                onChange={onChange}
                />
        </div>
    )
}

export default CodeEditor
