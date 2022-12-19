export default class Validator {

    _OPTION = { help: ["--help", "-h"], lang: ["--español", "-es", "--english", "-en"], version: ["--version", "-v"] }
    _VERSION = "v.3.3.0-dev"

    _args = null
    _InFileIndex = -1
    _OutFileIndex = -1

    LANG = "EN"
    InFilePath = null
    OutFilePath = null

    MESSAGES = {
        EN: {
            help: "\nHTMLBundler.js [LANG] [INFO] [-i = INPUT FILE] [-o = OUTPUT FILE]\n\tLANG:\n\t--español, -es : Displays information, errors and manuals in Spanish.\n\t--english, -en : Displays information, errors and manuals in English.\n\tDefault: English\n\n\tINFO:\n\t--version, -v : Displays the current version of the program.\n\t--help, -h : Displays this help message.\n\n\tINPUT FILE : The name of your original HTML file.\n\t-i : Declare incoming file\n\n\tOUTPUT FILE : Name of your bundle HTML file.\n\t-o : Declare outgoing file\n",
            manyArgument: "Too many arguments",
            flagMissing: "Invalid arguments\nExpected: [-i = INPUT FILE] [-o = OUTPUT FILE]",
            hint: 'Type "HTMLBundler.js --help" to know more.',
            noOptionGiven: "No argument given\nMinimum expected: HTMLBundler.js [-i = INPUT FILE] [-o = OUTPUT FILE]",
            fileNotAssigned: "The options [-i] [-o] require a valid file\nExpected: [-i = INPUT FILE] [-o = OUTPUT FILE]",
            sameName: "The outgoing file name cannot be the same as the incoming file.",
            fileNotFound: "Could not open file:"
        },
        ES: {
            help: "\nHTMLBundler.js [IDIOMA] [INFO] [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]\n\tIDIOMA:\n\t--español, -es : Muestra la información, errores y manuales en Español.\n\t--english, -en : Muestra la información, errores y manuales en Inglés.\n\tDefault: English\n\n\tINFO:\n\t--version, -v : Muestra la versión actual del programa.\n\t--help, -h : Muestra este mensaje de ayuda.\n\n\tARCHIVO ENTRANTE : Nombre de tu archivo HTML original.\n\t-i : Declara el archivo entrante\n\n\tARCHIVO SALIENTE : Nombre de tu archivo HTML empaquetado.\n\t-o : Declara el archivo saliente\n",
            manyArgument: "Demasiados argumentos",
            flagMissing: "Argumentos inválidos\nSe esperaba: [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]",
            hint: 'Escribe "HTMLBundler.js --help" para conocer sus usos.',
            noOptionGiven: "Ningún argumento dado\nSe espera mínimo: HTMLBundler.js [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]",
            fileNotAssigned: "Las opciones [-i] [-o] necesitan un archivo válido\nSe esperaba: [-i = ARCHIVO ENTRANTE] [-o = ARCHIVO SALIENTE]",
            sameName: "El nombre del archivo saliente no puede ser el mismo del archivo entrante.",
            fileNotFound: "No se ha podido abrir el archivo:"
        }
    }

    /**
     * It validates the arguments given by the user and closes the program when it finds any irregularity.
     * @param {String[]} _args Arguments given by user
     * @returns Returns the language code, incoming file path and outgoing file path.
     */
    constructor(_args) {
        this._args = _args
        this._InFileIndex = _args.lastIndexOf("-i")
        this._OutFileIndex = _args.lastIndexOf("-o")

        this.argsNumChecker()
        this.setLang()
        this.showHelp()
        this.showVersion()
        this.IOFlagsChecker()
        this.fileChecker()

        this.InFilePath = this._args[this._InFileIndex + 1]
        this.OutFilePath = this._args[this._OutFileIndex + 1]

    }

    argsNumChecker() {
        if (this._args.length == 2) {
            console.error(new SyntaxError(this.MESSAGES[this.LANG]["noOptionGiven"]))
            console.info(this.MESSAGES[this.LANG]["hint"])
            process.exit(1)
        }

        if (this._args.length - 2 > 5) {
            console.error(new SyntaxError(this.MESSAGES[this.LANG]["manyArgument"]))
            console.info(this.MESSAGES[this.LANG]["hint"])
            process.exit(1)
        }

    }

    setLang() {
        if (this._OPTION["lang"].includes(this._args[2]))
            this._OPTION["lang"].indexOf(this._args[2]) <= 1 ? this.LANG = "ES" : this.LANG = "EN"
    }

    showHelp() {
        if (this._args.some((v) => (this._OPTION["help"].includes(v)))) {
            console.info(this.MESSAGES[this.LANG]["help"])
            process.exit(1)
        }
    }

    showVersion() {
        if (this._args.some((v) => (this._OPTION["version"].includes(v)))) {
            console.info(this._VERSION)
            process.exit(1)
        }
    }

    IOFlagsChecker() {
        if (this._InFileIndex == -1 || this._OutFileIndex == -1) {
            console.error(new Error(this.MESSAGES[this.LANG]["flagMissing"]))
            console.info(this.MESSAGES[this.LANG]["hint"])
            process.exit(1)
        }
    }

    fileChecker() {

        if (((!this._args[this._OutFileIndex + 1] || !this._args[this._InFileIndex + 1])) || (!this._args[this._OutFileIndex + 1].includes(".html") || !this._args[this._InFileIndex + 1].includes(".html"))) {
            console.error(new SyntaxError(this.MESSAGES[this.LANG]["fileNotAssigned"]))
            console.info(this.MESSAGES[this.LANG]["hint"])
            process.exit(1)
        }

        if (this._args[this._OutFileIndex + 1] == this._args[this._InFileIndex + 1]) {
            console.error(new Error(this.MESSAGES[this.LANG]["sameName"]))
            console.info(this.MESSAGES[this.LANG]["hint"])
            process.exit(1)
        }

    }

}