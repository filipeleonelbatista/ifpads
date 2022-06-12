// module.exports = function (api) {
//   api.cache(true);
//   return {
//
//   };
// };
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".tsx", ".ts", ".js", ".json"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
