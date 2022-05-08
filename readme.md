# Template download 
npx react-native init EtseTemplate --template react-native-template-typescript@6.9

# hermes enabled
android
    enableHermes: false -> true
ios 
    hermes_enabled => false -> true

# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/drawer @react-navigation/bottom-tabs
    https://reactnavigation.org/docs/getting-started/

npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
    https://github.com/software-mansion/react-native-screens#android
    https://docs.swmansion.com/react-native-gesture-handler/docs/installation
    https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/

    react-native-reanimated might require metro started with --reset-cache

# Vector Icons
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons
    https://github.com/oblador/react-native-vector-icons#installation

    https://oblador.github.io/react-native-vector-icons/

# Maps
npm install react-native-maps
    https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md

# Permissions
npm install react-native-permissions
    https://github.com/zoontek/react-native-permissions#setup

# Offline database

# i18n

# App Center

# Styling

