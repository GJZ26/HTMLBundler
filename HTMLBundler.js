import { argv } from 'node:process';

const OPTION = { help: ["--help", "-h"], lang: ["--español", "-es", "--english", "-en"], version: ["--version", "-v"] }
const VERSION = "v.2.0.1-dev"

let LANG = "EN"

const InFILE = argv.lastIndexOf("-i")
const OutFILE = argv.lastIndexOf("-o")

const INFO = {
    EN: {
        help: "\nHTMLBundler.js [LANG] [INFO] [-i = INPUT FILE] [-o = OUTPUT FILE]\n\tLANG:\n\t--español, -es : Displays information, errors and manuals in Spanish.\n\t--english, -en : Displays information, errors and manuals in English.\n\tDefault: English\n\n\tINFO:\n\t--version, -v : Displays the current version of the program.\n\t--help, -h : Displays this help message.\n\n\tINPUT FILE : The name of your original HTML file.\n\t-i : Declare incoming file\n\n\tOUTPUT FILE : Name of your bundle HTML file.\n\t-o : Declare outgoing file\n",
        manyArgument: "Too many arguments",
        flagMissing: "Invalid arguments\nExpected: [-i = INPUT FILE] [-o = OUTPUT FILE]",
        hint: 'Type "HTMLBundler.js --help" to know more.',
        noOptionGiven: "No argument given\nMinimum expected: HTMLBundler.js [-i = INPUT FILE] [-o = OUTPUT FILE]",
        fileNotAssigned: "The options [-i] [-o] require a valid file\nExpected: [-i = INPUT FILE] [-o = OUTPUT FILE]",
        sameName:"The outgoing file name cannot be the same as the incoming file."
    },
    ES: {
        help: "\nHTMLBundler.js [IDIOMA] [INFO] [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]\n\tIDIOMA:\n\t--español, -es : Muestra la información, errores y manuales en Español.\n\t--english, -en : Muestra la información, errores y manuales en Inglés.\n\tDefault: English\n\n\tINFO:\n\t--version, -v : Muestra la versión actual del programa.\n\t--help, -h : Muestra este mensaje de ayuda.\n\n\tARCHIVO ENTRANTE : Nombre de tu archivo HTML original.\n\t-i : Declara el archivo entrante\n\n\tARCHIVO SALIENTE : Nombre de tu archivo HTML empaquetado.\n\t-o : Declara el archivo saliente\n",
        manyArgument: "Demasiados argumentos",
        flagMissing: "Argumentos inválidos\nSe esperaba: [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]",
        hint: 'Escribe "HTMLBundler.js --help" para conocer sus usos.',
        noOptionGiven: "Ningún argumento dado\nSe espera mínimo: HTMLBundler.js [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]",
        fileNotAssigned: "Las opciones [-i] [-o] necesitan un archivo válido\nSe esperaba: [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]",
        sameName:"El nombre del archivo saliente no puede ser el mismo del archivo entrante."
    }
}


if (argv.length == 2) {
    console.error(new SyntaxError(INFO[LANG]["noOptionGiven"]))
    console.info(INFO[LANG]["hint"])
    process.exit(1)
}

if (OPTION["lang"].includes(argv[2]))
    OPTION["lang"].indexOf(argv[2]) <= 1 ? LANG = "ES" : LANG = "EN"



if (argv.length - 2 > 5) {
    console.error(new SyntaxError(INFO[LANG]["manyArgument"]))
    console.info(INFO[LANG]["hint"])
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

if (InFILE == -1 || OutFILE == -1) {
    console.error(new Error(INFO[LANG]["flagMissing"]))
    console.info(INFO[LANG]["hint"])
    process.exit(1)
}

if (((!argv[OutFILE + 1] || !argv[InFILE + 1])) || (!argv[OutFILE + 1].includes(".html") || !argv[InFILE + 1].includes(".html"))) {
    console.error(new SyntaxError(INFO[LANG]["fileNotAssigned"]))
    console.info(INFO[LANG]["hint"])
    process.exit(1)
}

if (argv[OutFILE + 1] == argv[InFILE + 1]){
    console.error(new Error(INFO[LANG]["sameName"]))
    console.info(INFO[LANG]["hint"])
    process.exit(1)
}