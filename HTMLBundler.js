import { argv } from 'node:process';

const OPTION = { help: ["--help", "-h"], lang: ["--español", "-es", "--english", "-en"], version: ["--version", "-v"] }
const VERSION = "v.0.0.0-dev"

const INFO = {
    EN: {
        help: "\nHTMLBundler.js [LANG] [INFO] [INPUT FILE] > [OUTPUT FILE]\n\tLANG:\n\t--español, -es : Displays information, errors and manuals in Spanish.\n\t--english, -en : Displays information, errors and manuals in English.\n\tDefault: English\n\n\tINFO:\n\t--version, -v : Displays the current version of the program.\n\t--help, -h : Displays this help message.\n\n\tINPUT FILE : The name of your original HTML file.\n\n\tOUTPUT FILE : Name of your bundle file.\n",
        argumentError: "Too many arguments",
    },
    ES: {
        help: "\nHTMLBundler.js [IDIOMA] [INFO] [ARCHIVO ENTRANTE] > [ARCHIVO SALIENTE]\n\tIDIOMA:\n\t--español, -es : Muestra la información, errores y manuales en Español.\n\t--english, -en : Muestra la información, errores y manuales en Inglés.\n\tDefault: English\n\n\tINFO:\n\t--version, -v : Muestra la versión actual del programa.\n\t--help, -h : Muestra este mensaje de ayuda.\n\n\tARCHIVO ENTRANTE : Nombre de tu archivo HTML original.\n\n\tARCHIVO SALIENTE : Nombre de tu archivo HTML empaquetado.\n",
        argumentError: "Demasiados argumentos",
    }
}

let LANG = "EN"

if (OPTION["lang"].includes(argv[2]))
    OPTION["lang"].indexOf(argv[2]) <= 1 ? LANG = "ES" : LANG = "EN"

if (argv.length - 2 > 5) {
    console.error(new SyntaxError(INFO[LANG]["argumentError"]))
    process.exit(1)
}

if (argv.some((v) => (OPTION["help"].includes(v)))) {
    console.info(INFO[LANG]["help"])
    process.exit(1)
}

if (argv.some((v) => (OPTION["version"].includes(v)))) {
    console.info(VERSION)
    process.exit(1)
}