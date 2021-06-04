import RoutingTable from './RoutingTable';
import { AuthProvider } from './services/AuthorizationService';
import { ThemeChangerProvider } from './services/ThemeContext'

import GlobalStyles from './helpers/global-styles';
import { Toaster } from 'react-hot-toast';

import ColorsOptions from './ColorsOptions';

function App() {

  return (
    <AuthProvider>
      <ThemeChangerProvider>
        <ColorsOptions>
          <GlobalStyles />
          <RoutingTable />
          <Toaster />
        </ColorsOptions>
      </ThemeChangerProvider>
    </AuthProvider >

  );
}

export default App;
