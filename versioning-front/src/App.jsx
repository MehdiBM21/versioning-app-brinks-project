import { useState } from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import PageLayout from './Layouts/PageLayout/PageLayout'
import { Route, Routes } from 'react-router-dom'
import Repositories from './components/Repositories/Repositories'
import Commits from './components/Commits/Commits'

function App() {
  const [count, setCount] = useState(0)
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <>
    <PageLayout>
      <Routes>
      <Route path="/repositories" element={<Repositories/>} />
      <Route path="/commits/:depotId" element={<Commits/>} />
</Routes>
      {/* <Button onClick={toggleColorMode}>{colorMode}</Button> */}
      </PageLayout>
    </>
  )
}

export default App
