# Typescript Boilerplate

## Summary

This is a boilerplate app with some sample logic to easily create your own Typescript Lambda (with DI using Inversify)

## Setup

Run Setup.ps1, this will install all the necessary node packages

## Running tests

execute "npm run _test script_"

## Start Typescript Watch

Press ctrl+shit+b and select tsc: watch

## Useful

-   Install 'Mocha Test Explorer' in VS Code
-   add these settings to VS Code settings JSON (ctrl+shift+p --> Preferences: Open Settings (JSON)):

```
"files.exclude": {
// include the defaults from VS Code
"**/.git": true,
"**/.DS_Store": true,
"**/.idea": true,

// exclude .js and .js.map files, when in a TypeScript project
"**/*.js": { "when": "$(basename).ts"},
"**/*.js.map": true
},

"typescript.updateImportsOnFileMove.enabled": "always",
"mochaExplorer.files": [
    "src/ConcreteTests/**/*.ts",
    "src/Tests/**/*.ts",
    "develop/Tests/**/*.ts"
  ],
"mochaExplorer.timeout": 999999,
"mochaExplorer.require": "ts-node/register",
"mocha.coverage":{"enable": false},
"mochaExplorer.exit": true,
"workbench.tree.indent": 17,
"workbench.list.horizontalScrolling": true
```
