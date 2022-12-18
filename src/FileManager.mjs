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

    constructor() {

    }

    readFile(path, lang="EN") {
        try {
            return (fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })).split("\n")
        } catch (e) {
            console.error(new Error(`${this.MESSAGE[lang]["fileNotFound"]} ${path}`))
            console.info(this.MESSAGE[lang]["hint"])
            process.exit(1)
        }
    }

}