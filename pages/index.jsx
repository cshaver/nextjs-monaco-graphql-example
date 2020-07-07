import dynamic from 'next/dynamic'

const Editor = dynamic(import('../Editor'), { ssr: false })

function Index() {
  return (
    <Editor />
  )
}

export default Index
