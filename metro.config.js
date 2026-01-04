const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// 🔴 핵심: 바인딩 주소 강제
config.server = {
  port: 8081,
  host: '127.0.0.1',
};

module.exports = config;
