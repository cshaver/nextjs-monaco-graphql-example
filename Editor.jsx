import MonacoEditor from 'react-monaco-editor';

import 'monaco-graphql/esm/monaco.contribution';

import sample from './code-sample'

window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
  if (label === 'json') return '/_next/static/json.worker.js'
  if (label === 'graphqlDev') return '/_next/static/monaco-graphql.worker.js'
  return '/_next/static/editor.worker.js'
}

export default function Editor() {
  return (
    <MonacoEditor
      height={'600px'}
      language="graphqlDev"
      theme="vs-dark"
      value={sample}
      onChange={console.log}
      editorDidMount={() => {
        window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
          if (label === 'json') return '/_next/static/json.worker.js'
          if (label === 'graphqlDev') return '/_next/static/monaco-graphql.worker.js'
          return '/_next/static/editor.worker.js'
        }
      }}
    />
  )
}
