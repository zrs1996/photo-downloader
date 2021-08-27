module.exports = {
  presets: ["@babel/env", "@babel/react"],
  plugins: [
    [
      "@babel/transform-react-jsx",
      {
        prama: "React.createElement",
      },
    ],
  ],
};
