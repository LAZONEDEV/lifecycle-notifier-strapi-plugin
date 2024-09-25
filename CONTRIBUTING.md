# Contributing

## Code of conduct

Please read our [code of conduct](./CODE_OF_CONDUCT.md).

## The project structure

At the root of the project is the plugin's main code, the `example` folder, which contains a Strapi project for testing purposes. This is where the plugin is installed.

## How to start the project

1. **Install all dependencies** with `yarn install` in the root directory and the `example` folder.

2. **Configuring the example app** : In example folder create a `..env` file with the content of `example/.env.example` file and adjust the environment variables values.

3. **Compile the plugin code** with the `yarn develop` command at the root folder. This will start the transpilation in watch mode.

4. **Start the example app** in the `example` folder run this command `yarn develop`.

## How to contribute

You can contribute by creating issue, Pull request etc.
For Pull request ensure that you use <https://www.conventionalcommits.org/fr/v1.0.0/>.
For scope currently we have two scopes `admin` , `server` and `test`.
The `admin` scope is for changes made in the admin app, the `server` for change related to the `backend` and `test` for testing.
