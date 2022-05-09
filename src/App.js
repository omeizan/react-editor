
import './App.css';
import React, {useState, useEffect} from 'react'
import Editor from './components/Editor';

function App() {
  

  const [html,setHtml] = useState('')
  const [css,setCss] = useState('')
  const [js,setJs] = useState('')
  const [srcDoc, setSrcDoc] = useState('')
  const [template , setTemplate] = useState('')

  useEffect(()=>{
    const timeout = setTimeout(()=>{
    setSrcDoc(
      `
  <html>
  <body>${html}</body>
  <style>${css}</style>
  <script>${js}</script>
  </html>
  `


    )
    },250)

    return ()=> clearTimeout(timeout)
  },[html, css, js])
  
const templates = [
  {
    html: '',
    css : ``,
    js:``
  },
  {
    html: '<div class="center-div"></div>',
    css : `body
    {
      background-color: #fcfcfc;
    }
    .center-div
    {
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100px;
      height: 100px;
      background-color: #000000;
      border-radius: 3px;
    }`,
    js:` `
  },
  {
    html: `<div class="card level-3">
    <h5>Floating Card</h5>
  </div>`,
    css : `@import url(https://fonts.googleapis.com/css?family=Roboto:400,300);
    body {
      background: #eeeeee;
      font-family: "Roboto", sans-serif;
    }
    
    * {
      box-sizing: border-box;
    }
    
    .card {
      background-color: #fff;
      border-radius: 4px;
      max-width: 400px;
      margin: 10% auto;
      height: 100px;
      position: relative;
      padding: 34px;
      color: #444;
      cursor: pointer;
    }
    .card:before {
      content: "";
      display: block;
      position: absolute;
      background-color: #ccc;
      left: 20px;
      right: 20px;
      bottom: 0;
      top: 50%;
      z-index: -1;
      box-shadow: 0 0 40px #999999;
      transition: box-shadow 0.2s ease-in-out;
    }
    .card.level-3:hover:before {
      box-shadow: 0 0 80px #999999;
    }
    .card h5 {
      font-weight: 300;
      font-size: 30px;
    }`,
    js:` `
  }
]
  return (
    <div className="App">
      <div className="navbar">
      
        <div className = 'box'>
          
          <select
            id="standard-select"
           onChange ={(e)=>{
             const selectedTemplate = e.target.value;
             setTemplate(selectedTemplate)
             setHtml(templates[selectedTemplate].html)
             setCss(templates[selectedTemplate].css)
           }}
           >
              <option value={0}>Select a template</option>
              <option value={1}>Center a div element</option>
              <option value={2}>Floadting Card</option>
          </select>
          </div>
      </div>
      <div className="pane top-pane">
        <Editor 
        language = "xml" 
        displayName = "HTML"
        value = {html}
        onChange = {setHtml}
        />
        <Editor 
        language = "css" 
        displayName = "CSS"
        value = {css}
        onChange = {setCss}
        />
        <Editor 
        language = "javascript" 
        displayName = "JavaScript"
        value = {js}
        onChange = {setJs}
        />
       
      </div>
      <div className='pane bottom-pane'>
      <iframe
        srcDoc={srcDoc}
         title='output'
         sandbox='allow-scripts'
         frameBorder={0}
         width = '100%'
         height='100%'
      />
      </div>
      
    </div>
  );
}

export default App;
