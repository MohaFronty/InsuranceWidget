import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './store/store';
import { lightTheme } from './theme/theme';
import OnboardingFlow from './components/OnboardingFlow';
import PWAInstallButton from './components/PWAInstallButton';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <OnboardingFlow />
        <PWAInstallButton />
      </ThemeProvider>
    </Provider>
  );
}

export default App
