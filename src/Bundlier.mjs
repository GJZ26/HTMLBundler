export default class Bundlier {

    IdChar = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    Idlenght = 0;
    IdRound = 1;

    ClassList = {}
    IDList = {}

    HTMLInfo = null
    HTMLMinified = ["<!-- Bundled by HTMLBundlerJS -->"]

    constructor(rawOrigin) {
        this.HTMLInfo = rawOrigin
        this.compressFile(this.HTMLInfo, this.HTMLMinified)
    }

    getId() {
        let id = ""

        for (let i = 0; i < this.IdRound; i++) {

            if (this.Idlenght < this.IdChar.length - 1) {

                this.Idlenght++
                id = `${this.IdChar[this.IdRound - 1]}${this.IdChar[this.Idlenght]}`
                continue;

            }

            this.Idlenght = 1
            this.IdRound++

        }

        return id.trim();
    }

    /**
     * Remove ident and comments
     * @param {String[]} file 
     * @param {String[]} saveOn
     */
    compressFile(file, saveOn) {

        file.map((line) => {
            let currentLine = line
            currentLine = currentLine.trim()

            if (currentLine) {

                currentLine = this.superTrim(currentLine)

                currentLine = currentLine.split('"')
                currentLine = currentLine.map((segment, index, result) => {

                    if (segment.includes("class=")) {
                        result[index + 1] = result[index + 1].split(' ').map((clazz) => {
                            this.ClassList[clazz] = this.getId()
                            return clazz.replace(clazz, this.ClassList[clazz])
                        }).join(" ")
                    }

                    if (segment.includes("id=")) {
                        result[index + 1] = result[index + 1].split(' ').map((clazz) => {
                            this.IDList[clazz] = this.getId()
                            return clazz.replace(clazz, this.IDList[clazz])
                        }).join(" ")
                    }

                    return result[index]
                }).join('"')

                saveOn.push(currentLine)
            }

        })
    }

    /**
     * 
     * @param {String} s Palabra a la cual se le eliminará espacios al final y dobles espacio
     */
    superTrim(s) {

        let result = s.trim().split("")

        for (let i = 0; i < result.length; i++) {

            if ((result[i] == "<" && result[i + 1] == " ") ||
                (result[i] == "" && result[i + 1] == " ") ||
                (result[i] == " " && result[i + 1] == " ") ||
                (result[i] == "=" && result[i + 1] == " ")
            ) {
                result[i + 1] = ""
            }

            if ((result[i] == ">" && (result[i-1] == " " && result[i+1]!= "")) ||
                (result[i] == "=" && (result[i-1] == " " && result[i+1]!= "")) ||
                (result[i] == "" && (result[i-1] == " " && result[i+1]!= ""))) {
                result[i - 1] = ""
            }

        }

        return result.join("")
    }

}