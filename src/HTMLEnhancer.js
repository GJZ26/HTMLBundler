import IdAllocator from "./IdAllocator.js"

export default class HTMLEnhancer {
    
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
        this.analyzer(this.HTMLMin)
        return this.HTMLMin
    }

    analyzer(file) {
        this.HTMLMin = this.removeComments(file)
        // this.HTMLMin = this.getJS(file)
        // this.HTMLMin = this.getCSS(file)
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

    getJS(file) {
        const result = file.map((line) => {
            let found = null

            if (line.includes("script")) {
                line.split('"').map((segment, index, all) => {
                    if (segment.includes("src=")) {
                        found = this.Allocators.createTag(all[index+1],"js")
                    }
                })
                return found
            }

            return line
        })

        return result
    }

    getCSS(file) {
        const result = file.map((line) => {
            let found = null

            if (line.includes("stylesheet")) {
                line.split('"').map((segment, index, all) => {
                    if (segment.includes("href=")) {
                        found = this.Allocators.createTag(all[index+1],"css")
                    }
                })
                return found
            }

            return line
        })

        return result
    }
}