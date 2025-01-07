module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./", //root directory
            "@components": "./components",
            "@screens": "./screens",
            "@gsui": "@gluestack-ui",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
    ],
  };
};
