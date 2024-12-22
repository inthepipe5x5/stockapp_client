const { getDefaultConfig } = require('expo/metro-config'); // eslint-disable-line
const { withNativeWind } = require('nativewind/metro'); //eslint-disable-line

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
