import Content from "components/content";
import ErrorNotification from "components/error-notification";
import Navbar from "components/navbar";
import Portal from "components/shared/portal";
import { StoreProvider } from "store/Provider";

function App() {
  return (
    <StoreProvider>
      <Portal containerId="portal-root">
        <Navbar />
      </Portal>
      <Content />
      <ErrorNotification />
    </StoreProvider>
  );
}

export default App;
