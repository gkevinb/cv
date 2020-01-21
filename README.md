# CV

Creating my CV using HTML, CSS, and JS

## Converting to PDF

Exporting my CV to a PDF using the following `wkhtmltopdf` command.
https://wkhtmltopdf.org/

PDF retains links same as in HTML.

```
wkhtmltopdf https://gaborkevinbarta.com/blog gabor.pdf
```

Note command can only be used on sites that are fully static, created using a static site generator. If there is anything dynaminc like `Vue.js` then the site won't be exported correctly.