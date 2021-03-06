// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only)
import enUsNamespace from 'locales/en-US';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      'en-US': typeof enUsNamespace;
    };
  }
}
