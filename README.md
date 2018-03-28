<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

---
# Webpack 4 basics

Webpack 4 basic setup with watch, dev server, css/scss, html, file loaders and plugins included.

---
## Packages installed

  - In-depth explanation in the [wiki]

---
## Install dependencies

```
cd path-to-your-project
npm install
```

### Additional install

```
npm i -g ntl
```

- By running **ntl** you can choose which script to run. For example **start**, **build**, **build:prod** and **watch** will be some of the choices. All of these scripts are in the `package.json` file in the scripts object.
- Command to start **ntl** and choose an option
```
ntl
```

### Without ntl

If you don't want to use ntl you can use the `npm run` command with the chosen script, examples:
- For development bundle
```
npm run build
```
- For production ready bundle
```
npm run build:prod
```
- For development server
```
npm run start
```
- For Webpack watch
```
npm run watch
```

---

# Resources used

## Official docs

- [webpack]
- [dev-server]
- **Clean Webpack plugin**
-- [clean-plugin-wp]
-- [clean-plugin-git]
- **HTML loader**
--[html-loader-wp]
-- [html-loader-git]
- **HTML plugin**
-- [html-plugin-wp]
-- [html-plugin-git]
- **Extract text plugin**
-- [extract-text-plugin-wp]
-- [extract-text-plugin-git]
- **CSS loader**
-- [css-loader-wp]
-- [css-loader-git]
- **PostCSS loader**
-- [postcss-loader-wp]
-- [postcss-loader-git]
- **Autoprefixer**
-- [autoprefixer-git]
- **SASS loader**
-- [sass-loader-wp]
-- [sass-loader-git]
- **Style loader**
-- [style-loader-wp]
-- [style-loader-git]
- **File loader**
-- [file-loader-wp]
-- [file-loader-git]
- **Source maps**
-- [source-maps]

## Youtube

- [LearnCode.academy]
- [Webpack and CSS]

## Medium

- [webpack-3-quickstarter]
- [webpack-the-confusing-parts]

---
License
---

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


[wiki]: <https://github.com/martin-corevski/webpack-basics/wiki/DIY-repository-setup>
[LearnCode.academy]: <https://www.youtube.com/watch?v=9kJVYpOqcVU>
[Webpack and CSS]: <https://www.youtube.com/watch?v=2-yKNoQ7jYM>
[webpack-3-quickstarter]: <https://hackernoon.com/webpack-3-quickstarter-configure-webpack-from-scratch-30a6c394038a>
[webpack-the-confusing-parts]: <https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9>
[webpack]: <https://webpack.js.org/configuration/>
[dev-server]: <https://webpack.js.org/configuration/dev-server/>
[clean-plugin-wp]: <https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder>
[clean-plugin-git]: <https://github.com/johnagan/clean-webpack-plugin>
[html-loader-wp]: <https://webpack.js.org/loaders/html-loader/>
[html-loader-git]: <https://github.com/webpack-contrib/html-loader>
[html-plugin-wp]: <https://webpack.js.org/plugins/html-webpack-plugin/>
[html-plugin-git]: <https://github.com/jantimon/html-webpack-plugin>
[extract-text-plugin-wp]: <https://webpack.js.org/plugins/extract-text-webpack-plugin/>
[extract-text-plugin-git]: <https://github.com/webpack-contrib/extract-text-webpack-plugin>
[css-loader-wp]: <https://webpack.js.org/loaders/css-loader/>
[css-loader-git]: <https://github.com/webpack-contrib/css-loader>
[postcss-loader-wp]: <https://webpack.js.org/loaders/postcss-loader/#src/components/Sidebar/Sidebar.jsx>
[postcss-loader-git]: <https://github.com/postcss/postcss-loader>
[autoprefixer-git]: <https://github.com/postcss/autoprefixer>
[sass-loader-wp]: <https://webpack.js.org/loaders/sass-loader/>
[sass-loader-git]: <https://github.com/webpack-contrib/sass-loader>
[style-loader-wp]: <https://webpack.js.org/loaders/style-loader/>
[style-loader-git]: <https://github.com/webpack-contrib/style-loader>
[file-loader-wp]: <https://webpack.js.org/loaders/file-loader/>
[file-loader-git]: <https://github.com/webpack-contrib/file-loader>
[source-maps]: <http://blog.teamtreehouse.com/introduction-source-maps>
