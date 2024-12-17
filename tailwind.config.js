// tailwind.config.js

export default {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // primary: "rgb(var(--color-primary)/<alpha-value>)",
      },
    },
  },
  plugins: [],
};
