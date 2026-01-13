# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1-alpha.1] - 2026-01-14

### Added

- **Core Period Tracking Features**
  - Password-protected app access with bcryptjs hashing
  - Interactive calendar view for period visualization
  - Comprehensive period logging (flow, symptoms, mood, notes)
  - Smart symptom checklist organized by categories
  - Educational content for period health awareness
  - CSV and PDF data export functionality
  - Local SQLite database storage (no cloud sync)

- **Security & Privacy**
  - Biometric authentication support (fingerprint/face unlock)
  - Background lock with biometric or password fallback
  - All data stored locally on device
  - No tracking, analytics, or server communication

- **User Interface**
  - Modern Material Design-inspired UI
  - Bottom tab navigation (Calendar, Education, Settings)
  - Full-screen day detail views
  - Responsive design optimized for Android
  - Custom splash screen with wave pattern

- **Development & Documentation**
  - TypeScript implementation
  - Comprehensive error handling
  - MIT License
  - Contributing guidelines and code of conduct
  - GitHub issue and PR templates

### Changed

- Updated splash screen design with red background and wave patterns
- Improved calendar navigation (auto-navigate to other months)
- Enhanced export service for React Native compatibility

### Fixed

- Prevent logging periods for future dates
- Fixed CSV/PDF export functionality using proper file system APIs
- Removed modal overlay conflicts in day detail views
- Added delete functionality for individual entries and all user data
- Resolved TypeScript errors and improved code quality

### Security

- **Note**: This is an MVP release. Future versions will include:
  - Database encryption
  - Screenshot prevention
  - Session timeout
  - Enhanced biometric security
  - Rate limiting for login attempts

### Known Issues

- iOS support not yet implemented (Android-only)
- Screenshot prevention not enabled
- Database not encrypted

---

## Types of changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities
