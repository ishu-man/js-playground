# Webpack (Odin Project)
- A bundler takes in an entry point, creates a dependency graph and combines all files together to output a single file with all the necessary code
- It can also minify your code or do optimizations
- webpack is a JS bundler (duh)
- (This is a blackbox to me right now:) Work inside src, build into dist and deploy from dist. This is just convention.
- create a webpack.config.js in the root and give it some values:
> module.exports object can contain the following:-
1. mode development or production
2. entry (in this case it's src/index.js)
3. output - this is another object that contains info on the output bundle:
    3(1). filename of the output
    3(2). path which determines the output directory path -> dist by convention
    3(3). if clean is true it "cleans" or clears the dist folder everytime it bundles
4. The HTMLWebpack Plugin will take in a template HTML file and spew out an HTML file following that template which is linked to the appropriate JS file. For that you need to create a template file and link that in the plugins key's corresponding value 
5. The CSS loader and style loader plugins (yes, you need two for CSS) take in css from your src and allow you to import that in your src JavaScript files (the example uses a side-effect import - which is just import "./styles.css";) - it then automatically handles the bundling for the final dist JS file.
6. To load images:
a. If the image is embedded in the css using url() css-loader handles that for you.
b. If the image is linked with src in an <img> you need html-loader.
c. If the image is used in JS file (ex. creating img tag, setting src attribute of those images) you need to tell webpack that these are assets by adding a rule in the config (asset/resource). Then in your JS you can default import it (ex. import myImage from "./myImage.png";) and use it as the image filepath (ex. img.src = myImage;)
7. Finally, the webpack dev server: When you made changes to your src files previously you would have to run `npx webpack` again and again. webpack-dev-server (using `npx webpack serve`) automatically creates a server for your files that updates with every change you make to your files (under watchfiles attribute). This means that when webpack draws the dependency graph and sees that there are any changes to your dependencies (could be JS or CSS or whatever you're importing) it triggers a rebundle for the dev server. When you add a file to the watched files it triggers a browser reload for any changes detected in that file. Note that HTML files are not a part of that dependency graph until they are explicitly rendered as a template using the HTMLwebpack plugin.
- npm scripts can be used to automate writing some of those lengthy commands, ex. putting this in `package.json` and running `npm run build` is the same as running `npx webpack`.
Some of the more useful cases for this can be found [here](https://dyte.io/blog/package-json-scripts/).
``` javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack serve"
  },
```
- webpack recommends that you create two separate config files: `webpack.dev.js` for development build and `webpack.prod.js` for production. They also recommend you follow DRY by introducing `webpack.common.js`. Read [this](https://webpack.js.org/guides/production/).