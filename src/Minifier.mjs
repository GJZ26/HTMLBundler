export default class Minifier {

    IdChar = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    Idlenght = 0;
    IdRound = 1;

    Idetificators = {}

    constructor() {
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

}