import Content from 'components/content'
import Navbar from 'components/navbar'
import Portal from 'components/shared/portal'
import { StoreProvider } from 'store/Provider'

function App() {
  return (
    <StoreProvider>
      <Portal containerId='portal-root'>
        <Navbar />
      </Portal>
      <Content />
    </StoreProvider>
  )
}

export default App
