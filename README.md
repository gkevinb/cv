# CV

Creating my CV using HTML, CSS, and JS


## Structure

`src/pages` : Source code for presentable version to go on Github Pages

`src/pdf` : Source code for pdf exportable version

`assets/` : Source code for CV and other assets

## Commands

Deploy development server for presentable version
```
npm run serve-pages
```
Deploy development server for pdf exportable version
```
npm run serve-pdf
```
Build presentable version for Github Pages
```
npm run build
```
Export pdf (without margins)
```
npm run pdf
```
Export pdf (with margins, not used)
```
npm run pdf-margin
```


## Converting to PDF

Exporting my CV to a PDF using the following `wkhtmltopdf` command.
https://wkhtmltopdf.org/

PDF retains links same as in HTML.

```
wkhtmltopdf https://gaborkevinbarta.com/blog gabor.pdf
```

Note command can only be used on sites that are fully static, created using a static site generator. If there is anything dynaminc like `Vue.js` then the site won't be exported correctly.

https://wkhtmltopdf.org/usage/wkhtmltopdf.txt

## Pug

```
pug -w ./src -o ./dist -P             
```
-w : watch
-o : output
-P : pretty