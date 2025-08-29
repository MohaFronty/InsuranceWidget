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

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setSnackbarMessage('Installing app...');
    } else {
      console.log('User dismissed the install prompt');
      setSnackbarMessage('Installation cancelled');
    }
    
    setShowSnackbar(true);
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Download sx={{ fontSize: 28 }} />}
        onClick={handleInstallClick}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          fontSize: '1.2rem',
          fontWeight: 'bold',
          px: 4,
          py: 2,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #0f4c75 0%, #3282b8 100%)',
          color: 'white',
          boxShadow: '0 8px 25px rgba(15, 76, 117, 0.4)',
          animation: 'pulse 2s infinite',
          '&:hover': {
            background: 'linear-gradient(135deg, #0a3d5f 0%, #2968a3 100%)',
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: '0 12px 35px rgba(15, 76, 117, 0.6)',
          },
          '&:active': {
            transform: 'translateY(-2px) scale(1.02)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 8px 25px rgba(15, 76, 117, 0.4)',
            },
            '50%': {
              boxShadow: '0 8px 25px rgba(15, 76, 117, 0.8)',
            },
            '100%': {
              boxShadow: '0 8px 25px rgba(15, 76, 117, 0.4)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: 'linear-gradient(135deg, #3282b8, #0f4c75, #bbe1fa)',
            borderRadius: 'inherit',
            zIndex: -1,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}
      >
        📱 Install App
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
