import dynamic from 'next/dynamic'

import sample from '../code-sample'

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

function GraphqlPage() {
  if (typeof window !== 'undefined') {
    require('monaco-graphql/esm/monaco.contribution');
  }

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

export default GraphqlPage
