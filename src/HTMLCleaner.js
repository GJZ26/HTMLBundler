import IdAllocator from "./IdAllocator.js"

export default class HTMLCleaner {
    
    HTML = []
    HTMLMin = []
    /** @type {IdAllocator} */
    Allocators = null

    /**
     * 
     * @param {*} file 
     * @param {IdAllocator} IdAllocators 
     */
    enhancer(file,IdAllocators){
        this.HTML = file
        this.Allocators = IdAllocators

        this.HTML.map((line) => {
            let currentLine = line.trim()

            if (currentLine) {
                currentLine = this.superTrim(currentLine)
                currentLine = currentLine.split('"')
                currentLine = currentLine.map((segment, index, result) => {

                    if (segment.includes("class=")) {
                        result[index + 1] = result[index + 1].split(' ').map((clazz) => {
                            this.Allocators.createTag(clazz,"class")
                            return clazz.replace(clazz, this.Allocators.getTag(clazz,"class"))
                        }).join(" ")
                    }

                    if (segment.includes("id=")) {
                        result[index + 1] = result[index + 1].split(' ').map((clazz) => {
                            this.Allocators.createTag(clazz,"id")
                            return clazz.replace(clazz, this.Allocators.getTag(clazz,"id"))
                        }).join(" ")
                    }

                    return result[index]
                }).join('"')

                this.HTMLMin.push(currentLine)
            }

        })

        return this.HTMLMin
    }

    analyzer(file) {

    }
    
    superTrim(line) {
        let result = line.trim().split("").filter((segment, index, incoming) => {

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

    removeComments(line) {
        let inComment = false

        line = line.filter((segment) => {

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

        return (line)
    }

    getJS(line) {
        const result = line.map((line) => {
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

    getCSS(line) {
        const result = line.map((line) => {
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
}