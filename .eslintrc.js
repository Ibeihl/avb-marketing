module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react-hooks"
  ],
  rules: {
    "max-len": 0,
    "no-underscore-dangle": 1,
    "no-use-before-define": 0,
    "object-curly-newline": [2, { "ImportDeclaration": "never" }],
    "no-param-reassign": ["error", { "props": false }],
    "react/no-unescaped-entities": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    // this is v.dumb - remove href checking on <a> for next/link
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/label-has-for": 0,
    "no-unused-vars": [2, {
      "argsIgnorePattern": "^_"
    }],
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight" ],
      "aspects": [ "invalidHref" ]
    }],
    "jsx-a11y/click-events-have-key-events": 0, // turn off for <a> link onClicks (analytics)
    "jsx-a11y/no-static-element-interactions": 0, // turn off for <a> link onClicks (analytics)
  },
  "globals": {
    "document": true,
    "window": true,
    "navigator": true,
  }
};

// jsx-a11y/anchor-is-valid
// jsx-a11y/click-events-have-key-events
// jsx-a11y/no-static-element-interactions