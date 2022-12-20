import data from './module-info.json' assert {"type":"json"}

export default class Validator {

    _OPTION = { help: ["--help", "-h"], lang: ["--español", "-es", "--english", "-en"], version: ["--version", "-v"] }
    _VERSION = data.version

    _args = null
    _InFileIndex = -1
    _OutFileIndex = -1

    LANG = "EN"
    InFilePath = null
    OutFilePath = null

    MESSAGES = data.messages

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