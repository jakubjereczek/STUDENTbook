import './App.css';
import RoutingTable from './RoutingTable';
import { AuthProvider } from './services/AuthorizationService';
import { ThemeProvider } from 'styled-components';
import colors from './helpers/colors'
import GlobalStyles from './helpers/global-styles';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <AuthProvider>
      <ThemeProvider theme={colors}>
        <GlobalStyles />
        <RoutingTable />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>

  );
}

export default App;
