# 🛡️ Insurance Onboarding Widget

A professional, embeddable insurance application widget built with React, TypeScript, and Material UI. Perfect for insurance firms looking to add modern onboarding flows to their websites without development costs.

![Insurance Widget Demo](https://insurance-widget.vercel.app/screenshot.png)

## 🚀 Live Demo

- **🏠 Main Widget**: [insurance-widget.vercel.app](https://insurance-widget.vercel.app/)
- **📋 Integration Demo**: [insurance-widget.vercel.app/demo](https://insurance-widget.vercel.app/demo)
- **🧪 Test Page**: [insurance-widget.vercel.app/test](https://insurance-widget.vercel.app/test)

## ✨ Features

### 🎯 **Core Functionality**
- **Multi-step onboarding flow** with smooth animations
- **Form validation** with real-time error handling
- **Responsive design** that works on all devices
- **PWA support** with offline functionality
- **Confetti celebrations** for completed applications

### 🔧 **Technical Features**
- **Iframe-friendly** with secure cross-origin messaging
- **Redux state management** for complex application logic
- **Material UI components** for professional appearance
- **TypeScript** for type safety and better development experience
- **Service worker** for offline capabilities and caching

### 💼 **Business Features**
- **Easy integration** - just one iframe tag
- **Brand customization** through configuration
- **Event tracking** for analytics integration
- **Mobile-first design** for modern user expectations
- **GDPR compliant** with secure data handling

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Material UI
- **State Management**: Redux Toolkit
- **Build Tool**: Vite
- **Styling**: CSS-in-JS with Material UI theming
- **PWA**: Service Worker, Web App Manifest
- **Deployment**: Vercel with CI/CD
- **Version Control**: Git, GitHub

## 🚀 Quick Start

### Development Setup

```bash
# Clone the repository
git clone https://github.com/RaymanMoha/InsuranceWidget.git
cd InsuranceWidget

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📋 Integration Guide

### Basic Integration

Add this iframe to any website:

```html
<iframe 
  src="https://insurance-widget.vercel.app/" 
  width="100%" 
  height="700px"
  frameborder="0"
  style="border: none; border-radius: 8px;">
</iframe>
```

### WordPress Integration

1. **Gutenberg Editor**: Add an HTML block
2. **Classic Editor**: Switch to HTML view
3. **Page Builders**: Use HTML/Custom Code widget
4. **Widgets**: Add to sidebar or footer

### Advanced Integration with Events

```javascript
// Listen for widget events
window.addEventListener('message', function(event) {
  if (event.data.source === 'insurance-onboarding-widget') {
    switch(event.data.type) {
      case 'ONBOARDING_STEP_CHANGE':
        console.log('Step changed:', event.data.payload);
        // Track analytics, update UI, etc.
        break;
      
      case 'ONBOARDING_COMPLETE':
        console.log('Application completed!');
        // Redirect, show success message, etc.
        break;
      
      case 'RESIZE_REQUEST':
        // Auto-resize iframe
        const iframe = document.getElementById('insurance-widget');
        iframe.style.height = event.data.payload.height + 'px';
        break;
    }
  }
});

// Send configuration to widget
iframe.contentWindow.postMessage({
  source: 'insurance-parent-site',
  type: 'CONFIG',
  payload: {
    brandColor: '#your-brand-color',
    companyName: 'Your Insurance Company'
  }
}, '*');
```

##  Customization

### Brand Colors
```javascript
// Send brand configuration
{
  brandColor: '#20585C',
  companyName: 'Your Insurance Co.',
  logoUrl: 'https://yoursite.com/logo.png'
}
```

### Widget Events
- `ONBOARDING_STEP_CHANGE` - User navigates between steps
- `ONBOARDING_COMPLETE` - Application submitted successfully
- `RESIZE_REQUEST` - Widget requests height adjustment
- `ERROR` - Form validation or submission errors

##  PWA Features

### Offline Functionality
- **Service Worker**: Caches resources for offline use
- **Background Sync**: Queues form submissions when offline
- **Install Prompt**: Users can install as native app

### Installation
1. Visit the widget URL on mobile/desktop
2. Look for browser install prompt
3. Click "Install App" button (bottom right)
4. Use as standalone application

## 🧪 Testing

### Automated Testing
```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Check TypeScript types
npm run type-check
```

### Manual Testing
- **Test Page**: Interactive testing environment
- **Demo Page**: WordPress integration example
- **Mobile Testing**: Responsive design validation
- **PWA Testing**: Offline functionality verification

##  Security

- **HTTPS Only**: Secure data transmission
- **CORS Configured**: Safe cross-origin communication
- **XSS Protection**: Input validation and sanitization
- **CSP Headers**: Content Security Policy implementation

##  Business Value

### For Insurance Companies
- ** Cost Savings**: No development team needed
- ** Fast Deployment**: Integration in minutes, not months
- ** Modern Experience**: Mobile-first, PWA-ready
- ** Professional Design**: Material UI components



## Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **Bundle Size**: <1MB gzipped
- **Load Time**: <2s on 3G connection
- **Core Web Vitals**: All metrics in green

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Support

- **Documentation**: [Project Wiki](https://github.com/RaymanMoha/InsuranceWidget/wiki)
- **Issues**: [GitHub Issues](https://github.com/RaymanMoha/InsuranceWidget/issues)
- **Email**: support@insurancewidget.com
- **Demo**: [Live Demo](https://insurance-widget.vercel.app/)

## 🚗 Roadmap

### Version 2.0
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Custom form builder
- [ ] API integrations (CRM, payment processors)
- [ ] White-label branding options

### Version 2.1
- [ ] A/B testing framework
- [ ] Machine learning form optimization
- [ ] Voice input support
- [ ] Advanced reporting features

---

**Made with ❤️ for the insurance industry**

*Transform your insurance applications from complex forms to delightful experiences.*
