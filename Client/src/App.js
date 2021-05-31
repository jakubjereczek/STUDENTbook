import './App.css';
import AuthorizationValidation from './AuthorizationValidation';
import { AuthProvider } from './services/AuthorizationService';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <AuthorizationValidation />
        <h2>Hello world</h2>
      </div>
    </AuthProvider>

  );
}

export default App;
