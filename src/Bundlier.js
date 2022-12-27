import IdAllocator from "./IdAllocator";

export default class Bundlier {

    IdChar = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    Idlenght = 0;
    IdRound = 1;

    ClassList = {}
    IDList = {}

    HTMLInfo = null
    HTMLMinified = []
    JSRecovery = []
    CSSRecovery = []

    /**
     * @deprecated Use HTMLCleaner instead
     * @param {String[]} rawOrigin - file to load
     */
    constructor(rawOrigin) {
        this.HTMLInfo = rawOrigin
        this.compressFile(this.HTMLInfo, this.HTMLMinified)
        this.HTMLMinified = this.removeComments(this.HTMLMinified)
        this.HTMLMinified = this.separateStyleSheet(this.HTMLMinified)
        this.HTMLMinified = this.separateScripts(this.HTMLMinified)
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
     * This method removes the repeated spaces, and those at the end and beginning of the given String.
     * @param {String} s String to eliminate spaces
     * @returns String of the given parameter without duplicated spaces
     */
    superTrim(s) {

        let result = s.trim().split("").filter((segment, index, incoming) => {

            if ((segment == " " && (incoming[index + 1] == " " || incoming[index + 1] == "=" || incoming[index + 1] == "<" || incoming[index + 1] == ">"))) {
                return
            }

            return segment
        })

        result = result.filter((segment, index, incoming) => {
            if (segment == " " && (incoming[index - 1] == "=" || incoming[index - 1] == ">")) {
                return
            }
            return segment
        })

        return result.join("")
    }

    /**
     * 
     * @param {String[]} info 
     * @param {String[]} saveOn
     */
    removeComments(info) {
        let inComment = false

        info = info.filter((segment) => {

            if (segment.includes("<!--")) {
                inComment = true
            }

            if (inComment && segment.includes("-->")) {
                inComment = false
                return
            }

            if (inComment) {
                return
            }

            if (segment.includes("-->")) {
                inComment = false
            }


            return segment
        })

        return (info)
    }

    separateStyleSheet(info) {

        const result = info.map((line) => {
            let found = null

            if (line.includes("stylesheet")) {
                line.split('"').map((segment, index, all) => {
                    if (segment.includes("href=")) {
                        found = this.getId()
                        this.CSSRecovery[all[index + 1]] = found
                    }
                })
                return found
            }

            return line
        })

        return result
    }

    separateScripts(info) {

        const result = info.map((line) => {
            let found = null

            if (line.includes("script")) {
                line.split('"').map((segment, index, all) => {
                    if (segment.includes("src=")) {
                        found = this.getId()
                        this.JSRecovery[all[index + 1]] = found
                    }
                })
                return found
            }

            return line
        })

        return result
    }

}