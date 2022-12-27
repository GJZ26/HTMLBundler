import fs from 'fs'

export default class FileManager {

    MESSAGE = {
        EN: {
            hint: 'Type "HTMLBundler.js --help" to know more.',
            fileNotFound: "Could not open file:"
        },
        ES: {
            hint: 'Escribe "HTMLBundler.js --help" para conocer sus usos.',
            fileNotFound: "No se ha podido abrir el archivo:"
        }
    }

    rootDir = null

    /**
     * Verifies that the given file exists, otherwise returns an error and terminates the program.
     * @param {String} path - Path to file to read
     * @param {String} lang - Language to show any error messages, default English
     * @returns - Array of the given file
     */
    readFile(path, lang = "EN") {

        if (!this.rootDir) {
            this.rootDir = path.slice(0, path.lastIndexOf("/") + 1)
        }

        path.replace("./","")

        try {
            return (fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })).split("\n")
        } catch (e) {
            console.error(new Error(`${this.MESSAGE[lang]["fileNotFound"]} ${path}`))
            console.info(this.MESSAGE[lang]["hint"])
            process.exit(1)
        }
    }

}