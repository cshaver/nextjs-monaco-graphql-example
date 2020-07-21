import MonacoEditor from 'react-monaco-editor';

import 'monaco-graphql/esm/monaco.contribution';

import { api as GraphQLAPI } from 'monaco-graphql';

import sample from './code-sample'

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

GraphQLAPI.setSchemaConfig({ uri: SCHEMA_URL });
GraphQLAPI.setSchema(`# Enumeration type for a level of priority
enum Priority {
  LOW
  MEDIUM
  HIGH
}

# Our main todo type
type Todo {
  id: ID!
  name: String!
  description: String
  priority: Priority!
}

type Query {
  # Get one todo item
  todo(id: ID!): Todo
  # Get all todo items
  allTodos: [Todo!]!
}

type Mutation {
  addTodo(name: String!, priority: Priority = LOW): Todo!
  removeTodo(id: ID!): Todo!
}

schema {
  query: Query
  mutation: Mutation
}`);

export default function Editor() {
  return (
    <MonacoEditor
      height={'600px'}
      language="graphqlDev"
      theme="vs-dark"
      value={sample}
      onChange={console.log}
      editorDidMount={(editor) => {
        console.log(editor)
      }}
    />
  )
}
