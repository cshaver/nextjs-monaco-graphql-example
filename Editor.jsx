import MonacoEditor from 'react-monaco-editor';

import 'monaco-graphql/esm/monaco.contribution';

import {
  buildClientSchema,
  printSchema,
} from 'graphql';
import { api as GraphQLAPI } from 'monaco-graphql';

import sample from './code-sample'
import { GITHUB } from './largeSchema'

const introspection = GITHUB
const graphqlSchemaObj = buildClientSchema(introspection.data);
const sdlString = printSchema(graphqlSchemaObj);

const SCHEMA_URL = 'https://api.spacex.land/graphql/';

window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
  if (label === 'json') return '/_next/static/json.worker.js'
  if (label === 'graphqlDev') return '/_next/static/graphql.worker.js'
  return '/_next/static/editor.worker.js'
}

GraphQLAPI.setFormattingOptions({
  prettierConfig: {
    printWidth: 120,
  },
});

GraphQLAPI.setSchema(sdlString).then(() => {
  console.log(introspection);
  console.log(sdlString);

  window.GraphQLAPI = GraphQLAPI
  window.sdlString = sdlString

  console.log('🕷 parsing...')
  GraphQLAPI.parse(sdlString).then((document) => {
    console.log('✅ parsed!')
    console.log(document)
  });
});

// GraphQLAPI.setSchemaConfig({ uri: SCHEMA_URL });

export default function Editor() {
  return (
    <MonacoEditor
      height={'600px'}
      language="graphqlDev"
      theme="vs-dark"
      value={sample}
      onChange={() => {}}
      editorDidMount={(editor) => {
        console.log(editor)
      }}
    />
  )
}
