import { useState, useEffect } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
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
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowInstallButton(false);
      setSnackbarMessage('App installed successfully!');
      setShowSnackbar(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setSnackbarMessage('Installing app...');
        setShowSnackbar(true);
        // Hide the button immediately when accepted
        setShowInstallButton(false);
      } else {
        console.log('User dismissed the install prompt');
        setSnackbarMessage('Installation cancelled');
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error('Install prompt failed:', error);
      setSnackbarMessage('Installation failed. Please try again.');
      setShowSnackbar(true);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
      // Only hide if not already hidden from acceptance
      if (showInstallButton) {
        setShowInstallButton(false);
      }
    }
  };

  if (!showInstallButton) return null;

  return (
    <>
      <Button
        variant="outlined"
        startIcon={!isInstalling ? <Download sx={{ fontSize: 18 }} /> : undefined}
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
        {isInstalling ? 'Installing...' : 'Install'}
      </Button>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PWAInstallButton;
