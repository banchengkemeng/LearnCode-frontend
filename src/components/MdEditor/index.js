import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import { Editor } from '@bytemd/react'

import "highlight.js/styles/vs.css";
import 'bytemd/dist/index.css'

const plugins = [
    gfm(),
    highlight(),
    math()
    // Add more plugins here
]

const MdEditor = ({value, onChange}) => {
    return (
        <Editor
            value={value || ''}
            plugins={plugins}
            onChange={onChange}
            mode={'split'}
        />
    )
}

export default MdEditor
