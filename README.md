Electron, Webpack 2, React and Sass
-----------------------------------

Boilerplate for a setup based on Electron, Webpack 2, React and Sass with hot reloading, Babel will transpile ES6 to ES2015.

A css file is created by using *extract-text-webpack-plugin*.
ES6 arrow functions within React Components are possible by the babel plugin *transform-class-properties*

- npm install
- npm run web -> develop on localhost:8080, main process features are not available as we have a render process only
- npm run electron -> open up in electron and work with communication between main and render process if needed
- npm run bin -> create darwin app

I tried to keep it simple to inspire you. Feel free to suggest improvements :)

