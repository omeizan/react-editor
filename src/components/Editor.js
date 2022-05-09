import React,{useState} from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faMaximize } from '@fortawesome/free-solid-svg-icons'
import {faDownLeftAndUpRightToCenter} from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Controlled as ControlledEditor} from 'react-codemirror2'

export default function Editor(props) {
    const [isShowingAlert, setShowingAlert] = useState(false);
    const state = {
        value: '',
        copied: false,
      };
    const [open,setOpen] = useState(true)
    const {
        language,
        displayName,
        value,
        onChange
    } = props

    function handleChange(editor, data, value){
        onChange(value)
    }

  return (
      <>
      <div
          className={`alert alert-success ${isShowingAlert ? 'alert-shown' : 'alert-hidden'}`}
          onTransitionEnd={() => setShowingAlert(false)}
        >
          Copied to clipboard!
        </div>
    <div className = {`editor-container ${open?'':'collapsed'}`}>
        <div className="editor-title">
            {displayName}

            <div className="controls">
            <button onClick={ ()=> setOpen(prevOpen => !prevOpen)}>{open? <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />:<FontAwesomeIcon icon={faMaximize}/>}</button>
            <CopyToClipboard text={value}
          onCopy={() => { setShowingAlert(true);this.setState({copied: true}) } }>
          <button><FontAwesomeIcon icon={faCopy} /></button>
        </CopyToClipboard>
        </div>
        </div>
        <ControlledEditor
        onBeforeChange={handleChange}
            value = {value}
            className = 'code-mirror-wrapper'
            options = {{
                lineWrapping: true,
                lint:true,
                mode:language,
                theme: 'material',
                lineNumbers:true,
                indentWithTabs:true
                
            }}
        />
    </div>
    </>
  )
}

