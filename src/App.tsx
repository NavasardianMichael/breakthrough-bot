import AuthContainer from 'components/auth-container';
import Content from "components/content";
import ErrorNotification from "components/error-notification";
import Navbar from "components/navbar";
import Portal from "components/shared/portal";
import { StoreProvider } from "store/Provider";

function App() {
  return (
    <AuthContainer>
      <StoreProvider>
        <Portal containerId="portal-root">
          <Navbar />
        </Portal>
        <Content />
        <ErrorNotification />
      </StoreProvider>
    </AuthContainer>
  );
}

export default App;
