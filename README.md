# Tydal

![Version](https://img.shields.io/badge/version-0.0.1--alpha.1-orange)
![Status](https://img.shields.io/badge/status-alpha-red)
![Stability](https://img.shields.io/badge/stability-unstable-red)

An offline first, private, secure period tracking app built with Expo and React Native.

> **PRE-RELEASE ALPHA**: This is an early development version. Features may be incomplete, unstable, or subject to breaking changes. Not recommended for production use.

## Quick Start

**Note**: This alpha version may have bugs. Backup your data before testing.

For setup and installation instructions, follow the official [Expo Getting Started Guide](https://docs.expo.dev/get-started/set-up-your-environment/).

Once Expo is set up:

1. Clone or download this repository
2. Run `npm install` in the project folder
3. Run `npx expo start` to launch the development server
4. Use Expo Go on your device to scan the QR code and test the app

For troubleshooting, refer to the [Expo Documentation](https://docs.expo.dev/).

## Features

**Password Protected** - Secure access to your personal health data  
**Local Storage** - All data stays on your device, no cloud sync  
**Calendar View** - Beautiful visual calendar of your period  
**Comprehensive Logging** - Track flow, symptoms, mood, and notes  
**Smart Symptoms** - Pre-filled symptom checklist by category  
**Data Export** - CSV and PDF export for backup and analysis  
**Educational Content** - Guides for first-time period users  

## Project Structure

```
app/                      # Main app screens
├── _layout.tsx          # Auth flow & navigation
└── index.tsx            # Main app with tabs

components/              # Reusable UI components
├── auth-setup.tsx       # Password setup
├── auth-login.tsx       # Login screen
├── calendar-view.tsx    # Calendar visualization
├── log-editor.tsx       # Period logging form
└── education-tab.tsx    # Educational content

lib/                      # Business logic
├── data-service.ts      # Database operations
└── export-service.ts    # CSV/PDF export

scripts/
└── db.ts                # Database & auth setup
```

## Tech Stack

- **Framework**: Expo & React Native  
- **Language**: TypeScript  
- **Database**: SQLite  
- **Security**: bcryptjs + Secure Store  
- **Navigation**: React Navigation  

## How It Works

1. **Setup**: Create a password on first launch
2. **Login**: Password-protected app access
3. **Track**: Log your period with flow, symptoms, mood, notes
4. **Visualize**: View your cycle on an interactive calendar
5. **Export**: Download data as CSV or PDF

## Security

- All data stored locally on device
- Password hashed with bcryptjs
- No server communication
- No tracking or analytics

## Development Status

**🚧 This is a pre-release alpha version (0.0.1-alpha.1)**

- **Breaking Changes Expected**: APIs, UI, and features may change significantly between releases.
- **Not Production Ready**: Use at your own risk for testing and feedback only.
- **Bug Reports Welcome**: Please report issues via [GitHub Issues](https://github.com/samiranghosh04/tydal/issues).
- **Contributing**: Help improve stability by contributing fixes or features.

Future enhancements planned:

- Database encryption
- Screenshot prevention
- Session timeout
- Enhanced biometric security
- Predictions
- Notifications

## Documentation

A comprehensive feature documentation site in works right now.

See [CHANGELOG.md](./CHANGELOG.md) for version history and release notes.

## Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
---

Built with ❤️ for period health awareness and privacy.
