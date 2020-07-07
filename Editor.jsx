import MonacoEditor from 'react-monaco-editor';

import 'monaco-graphql/esm/monaco.contribution';

import { api as GraphQLAPI } from 'monaco-graphql';

import sample from './code-sample'

const SCHEMA_URL = 'https://api.spacex.land/graphql/';

window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
  if (label === 'json') return '/_next/static/json.worker.js'
  if (label === 'graphqlDev') return '/_next/static/monaco-graphql.worker.js'
  return '/_next/static/editor.worker.js'
}

GraphQLAPI.setFormattingOptions({
  prettierConfig: {
    printWidth: 120,
  },
});

GraphQLAPI.setSchemaConfig({ uri: SCHEMA_URL });

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
