# Template 
npx react-native init EtseTemplate --template react-native-template-typescript@6.9
    https://reactnative.dev/docs/environment-setup

# eslint / prettier
https://dev-yakuza.posstree.com/en/react-native/eslint-prettier-husky-lint-staged/#prepare-react-native-project

# hermes enabled
android
    enableHermes: false -> true
ios 
    hermes_enabled => false -> true

# Exception Handler
npm i react-native-exception-handler
    https://github.com/a7ul/react-native-exception-handler#usage

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

# Offline database
npm install @nozbe/watermelondb
npm install --save-dev @babel/plugin-proposal-decorators
    https://nozbe.github.io/WatermelonDB/Installation.html

# Permissions
npm install react-native-permissions
    https://github.com/zoontek/react-native-permissions#setup

# Camera
npm install react-native-vision-camera
    https://mrousavy.com/react-native-vision-camera/docs/guides

# i18n

# App Center
npm install appcenter appcenter-analytics appcenter-crashes --save-exact
    https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native

# Code Push
npm install react-native-code-push
    https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-get-started

# General
npm install @react-native-community/netinfo
npm install react-native-fs
npm install react-native-fast-image
npm install react-native-restart

# ios after every npm install
pod install --repo-update




