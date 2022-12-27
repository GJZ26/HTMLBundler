export default class IdAllocator {

    TagsChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    TagsAllocator = [-1]

    /**@type {Object} */
    Classes = {}
    IDS = {}
    JSlinks = {}
    CSSlinks = {}

    createTag(key, type) {

        let lastInd = this.TagsAllocator.length - 1

        if (this.TagsAllocator.every((digit) => {
            return this.save(key, type, digit == this.TagsChars.length - 1)
        })) {
            this.TagsAllocator.fill(0)
            this.TagsAllocator.push(0)
            return this.save(key, type, this.TagsAllocator.map((pos) => { return this.TagsChars[pos] }).join(""))
        }

        this.TagsAllocator[lastInd]++

        if (this.TagsAllocator[lastInd] == this.TagsChars.length) {
            this.TagsAllocator[lastInd] = 0
            for (let i = this.TagsAllocator.length - 2; i > -1; i--) {

                if (this.TagsAllocator[i] < this.TagsChars.length - 1) {
                    this.TagsAllocator[i]++
                    break;
                }

                this.TagsAllocator[i] = 0

            }
        }

        return this.save(key, type, this.TagsAllocator.map((pos) => { return this.TagsChars[pos] }).join(""))
    }

    save(key, type, value) {
        switch (type) {
            case "class":
                this.Classes[key] = value
                break;
            case "id":
                this.IDS[key] = value
                break;
            case "js":
                this.JSlinks[key] = value
                break;
            case "css":
                this.CSSlinks[key] = value
                break;
            default:
                console.warn("No se asignado el tipo, o no aparece en el listados de tipos admitidos\nPuede que este index no se encunetre indexado en ninguna lista de identificadores")
        }
        return value;
    }

    getTag(key, type) {
        switch (type) {
            case "class":
                return this.Classes[key]
            case "id":
                return this.IDS[key]
            case "js":
                return this.JSlinks[key]
            case "css":
                return this.CSSlinks[key]
            default:
                console.warn("No se asignado el tipo, o no aparece en el listados de tipos admitidos\nPuede que este index no se encunetre indexado en ninguna lista de identificadores")
        }
    }

    getKey(tag, type) {

        if (type == "class") {
            for (keys in this.Classes) {
                if (this.Classes[key] == tag)
                    return tag
            }
        }

        if (type == "id") {
            for (keys in this.IDS) {
                if (this.IDS[key] == tag)
                    return tag
            }
        }

        if (type == "js") {
            for (keys in this.JSlinks) {
                if (this.JSlinks[key] == tag)
                    return tag
            }
        }

        if (type == "id") {
            for (keys in this.CSSlinks) {
                if (this.CSSlinks[key] == tag)
                    return tag
            }
        }

        console.warn("No se asignado el tipo, o no aparece en el listados de tipos admitidos\nPuede que este index no se encunetre indexado en ninguna lista de identificadores")

    }
}