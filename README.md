# CV

Creating my CV using HTML, CSS, and JS


## Structure

`src/pages` : Source code for presentable version to go on Github Pages

`src/pdf` : Source code for pdf exportable version

`assets` : Source code for CV and other assets

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
Export pdf
```
npm run pdf-puppeteer
```


## Instructions

Run `npm run serve-pdf` command to start up localhost, then run `npm run pdf` to take snapshot of the localhost and convert it into a pdf file. The pdf file is called `example.pdf` and exported to the `export` directory.

## Converting to PDF 

Use puppeteer command

## Converting to PDF (Old way)

Exporting my CV to a PDF using the following `wkhtmltopdf` command.
https://wkhtmltopdf.org/

PDF retains links same as in HTML.

```
wkhtmltopdf https://gaborkevinbarta.com/blog gabor.pdf
```

Note command can only be used on sites that are fully static, created using a static site generator. If there is anything dynaminc like `Vue.js` then the site won't be exported correctly.

https://wkhtmltopdf.org/usage/wkhtmltopdf.txt

### Old commands

```
    "pdf-margin": "wkhtmltopdf http://localhost:3000/ export/margin.pdf",
    "pdf": "wkhtmltopdf -T 0 -B 0 -L 0 -R 0 --javascript-delay 1000 http://localhost:3000/ export/example.pdf && open export/example.pdf",
    "pdf-gabor": "wkhtmltopdf -T 0 -B 0 -L 0 -R 0 --javascript-delay 1000 http://localhost:3000/ export/GaborKevinBartaCV.pdf && open export/GaborKevinBartaCV.pdf",
```

## Pug

```
pug -w ./src -o ./dist -P             
```
-w : watch
-o : output
-P : pretty

## Inject data into Pug using Gulp

https://tusharghate.com/rendering-pug-templates-with-multiple-data-files

## Things to look out for

- CSS Grid and Flex does not work when exporting to PDF, seems like only classic CSS methods of positioning work
- Careful using `overflow: auto; /* Collapsing Margins */` might render 'ghosting' margin

https://stackoverflow.com/questions/42770774/wkhtmltopdf-same-configuration-different-output
