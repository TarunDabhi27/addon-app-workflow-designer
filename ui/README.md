# Plugin Development Guide

## **Programming skills required**

The developer shall have basic knowledge on:

-   Object Oriented JavaScript (OOJS)
-   ES6 classes and language understanding including async/await and promises
-   Basics of web components specifications and life cycle
-   Basics of HTML5 and CSS3
-   Ability to design and code programming flows
-   Web Components, Lit-Element and Polymer 3 basics
-   Basics of git and [github.com](http://github.com)

## **Infrastructure**

Below software are required to be installed in a dev environment to code, compile and create deployment artifact for a plugin.

The developer is also required to provide mentioned Riversand config to connect, deploy and run her under-development plugin component

-   VS Code - latest version
-   Node JS with NPM - Version: 14.15

-   Chrome (latest) - _add a link here_
-   VS Code extensions - eslint - _add a link here_
-   VS Code extensions - jsdoc - _add a link here_
-   Riversand Config Information:

    -   Riversand Developer Sandbox Environment URL (Example: [https://xxyyzzz.riversand.com](https://xxyyzz.riversand.com) or https://devtest.riversand.com)
    -   Client Id (Example: AAXX-xwsdf-w42343 or ABCCorp)
    -   Client Secret Key (Example: 11ED7069-EE5C-479C-B137-1B0F260E6C30)

## Dev Environment Setup

Here are high-level steps to be followed by plugin developers to set up a dev environment. Below activities can be performed using visual studio IDE and integrated terminal on IDE.

1.  Install visual studio code and the required extensions
2.  Install and setup local git
3.  Install npm by following [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)

    1.  If you already have npm, it may not be latest version. To update npm, run two commands: npm install -g n and then sudo n latest

4.  Decide / register unique identifier key for this plugin package and update it in the `config/default.json` file under the current `ui` folder.
    The same should be updated as the id field in the `application.json` file under the root of this repo.

    a. Make sure to define unique key for the addon-app. Eventually this would be generated / aquired by plugin registration processed.

5.  Clone Riversand github repository addon-app-template and create new plugin repository with name {{ADDON-APP-PACKAGE_NAME}}

    a. Create branch of {{ADDON-APP-PACKAGE_NAME}} repository in local system

    b. If not ready to create git repo, For the UI plugin, one can just download the UI folder under this repo in your local to start with.

6.  Open plugin folder on VS Code
7.  Find and replace existing plugin unique identifier (helloworld) in this repository to your registered identifier
8.  Execute `npm install` under your ui plugin folder

    a. To authenticate into Github's NPM repository you will need to update your personal access token in the .npmrc file under the ui folder
    Alternatively, if you are working on multiple addon apps, you can update the token in the .npmrc file under your root/home directory
    Add the line below to your .npmrc file
    //npm.pkg.github.com/:\_authToken={{ADD YOUR TOKEN HERE}}

9.  Update Env Settings file at /config/default.json:

    a. serverUrl - dev url of tenant you want to deploy and test plugin

    b. Headers - update user id, tenant id, auth client id, auth client secret and user roles. (Out of the box config is preset to engg-az-dev2 environment with [rdwadmin@riversand.com](mailto:rdwadmin@riversand.com) user's secret key)

    c. Config looks like below:

    d. ` { "envSettings": { "id": "{{ADDON-APP-PACKAGE_NAME}}", "server": "https://rdwengg-az-dev2.riversand.com", "userid": "rdwadmin@riversand.com", "authid": "lryFBhv1R9KA3HMJZHPCdThtFODah1M1", "authsecret": "Z6u26qromsQZsfjGC_7Ue5WaeN8driXf96_dCzNIGSA0B8NuuUoGKcqU8zmXbCkb", "tenantid": "rdwengg-az-dev2" } } `

10. Push plugin repo to git (add detail)

11. Plugin solution is now ready to code

## Plugin Solution

_Add solution structure and more detail here_

Plugin solution comes out of the box with the below modules integrated to get started with coding plugin business logic.

**Riversand specific modules (aka Riversand libraries):**

-   ui-platform-utils - add link here
-   ui-platform-aci - add link here
-   ui-platform-elements - add link here
-   ui-platform-dataaccess - add link here

-   ui-platform-business-elements - add link here

-   eslint-config-riversand - add link here

**External modules:**

-   Lit-Element and Polymer 3
-   Babel
-   ESLint
-   Gulp

## Develop plugin (Code, Compile, Unit Test, Deploy and Dev Test)

1.  Create plugin element or plugin function following guide at: dev guide link
2.  Create base config for plugin element under `/src/plugin-config`, if any by following guide at: plugin config guide link
3.  Add docking point config under `/src/docking-host-config` following guide at: docking-host-config guide link

    1. Check that the plugin path has been set as below inside docking-host-config.

        `/plugin-src/{{ADDON-APP-PACKAGE_NAME}}/elements/plugin-hello-world/plugin-hello-world.js`

4.  Ensure plugin logic is testable
5.  Lint plugin logic by running `npm run lint:all`
6.  Format by running `npm run format:all`
7.  Template comes out of the box with `plugin-hello-world`. Template also provides docking host config to deploy plugin as widget on home screen.
8.  Dev test:

    1.  Run `npm run build` command to create artifact and deploy plugin into configured dev environment.

        a. The build scripts uses the `ruf-apps-cli` which is Riversand's UI SDK Command Line utility.

    After you do `npm install`, you may need to run `npm link` in the ui folder.
    The npm link command allow us to locally ‘symlink a package folder’, and it will locally install the `ruf-apps-cli`

    2.  Open browser in dev mode(using query string **dev=true**), login and navigate to app where plugin is docked(through docking-host-config)
    3.  If app is already loaded, just refresh the page(f5) to verify recent plugin logic changes
    4.  Ensure query string dev=true is present all the time
    5.  Press _**F12**_ to open dev tools _**to debug**_ plugin logic by navigating to the plugin source file (Provide detail link here)

9.  Once the plugin is working as expected, _**push the changes to git**_

## Push Changes to Plugin Repository

1.  Once changes are verified, keep pushing changes to plugin git repo

## Production deployment

1.  Once plugin is ready with all testing done, submit the plugin to Riversand App Management team following process at : provide guide link here (TBD: R2)

##Styling a component

Every `js` file can have a corresponsing scss file. The scss file has to be name with extension `polymer.scss` if the component is extending PolymerElement or `.element.scss` if the component is extending a LitElement

For Components extending PolymerElement

```
import styles from './my-element.polymer.css.js';
import sharedStyles from '@riversandtechnologies/ui-platform-elements/lib/flow/styles/flow.polymer.css.js';

class MyElement extends PolymerElement {
    static get template() {
        return html`
            ${sharedStyles}
            ${styles}
            <div class="badge">
            ...
            </div>
        `;
    }
    ...
}
```

For Components extending LitElement

```
import { styles as sharedStyles } from '@riversandtechnologies/ui-platform-elements/lib/flow/styles/flow.element.css.js';
import { styles } from './my-element.element.css.js';

export class MyElement extends LitElement {

    static get styles() {
        return [styles, sharedStyles];
    }

    ...
}
```
