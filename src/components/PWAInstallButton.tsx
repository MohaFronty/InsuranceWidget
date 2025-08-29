import { useState, useEffect } from 'react';
import { Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { Download } from '@mui/icons-material';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      console.log('beforeinstallprompt event fired');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed successfully');
      setShowInstallButton(false);
      setDeferredPrompt(null);
      setSnackbarMessage('App installed successfully! 🎉');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
    };

    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check if running in standalone mode (installed PWA)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      
      if (isStandalone || isIOSStandalone) {
        console.log('PWA is already installed');
        setShowInstallButton(false);
        return true;
      }
      return false;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Initial check
    if (!checkIfInstalled()) {
      // Give some time for the beforeinstallprompt event to fire
      setTimeout(() => {
        if (!deferredPrompt) {
          console.log('PWA install criteria not met yet');
        }
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('No install prompt available');
      setSnackbarMessage('Install not available. Try refreshing or use browser menu.');
      setSnackbarSeverity('info');
      setShowSnackbar(true);
      return;
    }

    setIsInstalling(true);

    try {
      console.log('Showing install prompt...');
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log('User choice:', outcome);
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setSnackbarMessage('Installing app... Please wait');
        setSnackbarSeverity('info');
        setShowSnackbar(true);
        // Keep button visible until appinstalled event fires
      } else {
        console.log('User dismissed the install prompt');
        setSnackbarMessage('Installation cancelled');
        setSnackbarSeverity('info');
        setShowSnackbar(true);
        setShowInstallButton(false);
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
      setSnackbarMessage('Installation failed. Please try again or use browser menu.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      setShowInstallButton(false);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  // Don't show if not available
  if (!showInstallButton) return null;

  return (
    <>
      <Button
        variant="outlined"
        startIcon={
          isInstalling ? (
            <CircularProgress size={16} sx={{ color: 'inherit' }} />
          ) : (
            <Download sx={{ fontSize: 18 }} />
          )
        }
        onClick={handleInstallClick}
        disabled={isInstalling}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          fontSize: '0.8rem',
          fontWeight: 'medium',
          px: 1.5,
          py: 0.6,
          minWidth: 'auto',
          height: 36,
          borderRadius: 1.5,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(15, 76, 117, 0.3)',
          color: '#0f4c75',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            background: 'rgba(15, 76, 117, 0.08)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(15, 76, 117, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:disabled': {
            background: 'rgba(255, 255, 255, 0.7)',
            color: '#888',
          },
          transition: 'all 0.2s ease',
        }}
      >
        {isInstalling ? 'Installing...' : 'Install App'}
      </Button>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PWAInstallButton;
