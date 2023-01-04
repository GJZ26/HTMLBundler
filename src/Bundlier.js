import HTMLEnhancer from "./HTMLEnhancer.js";
import CSSEnhancer from "./CSSEnhancer.js";
import JSEnhancer from "./JSEnhancer.js";
import IdAllocator from "./IdAllocator.js";
import FileManager from "./FileVerifier.js";

export default class Bundlier {

    /** @type {String} */
    localLang = "EN"

    /** @type {IdAllocator} */
    idMemory = null

    /** @type {String []} */
    rawHTML = null

    /** @type {String []} */
    minFile = null

    /** @type {String []} */
    rawCSS = null

    /** @type {String []} */
    minCSS = null

    /** @type {String []} */
    rawJS = null

    /** @type {String []} */
    minJS = null

    /** @type {String} */
    inFile = null

    /** @type {String} */
    outFile = null

    /** @type {HTMLEnhancer} */
    HTMLMeth = null

    /** @type {CSSEnhancer} */
    CSSMeth = null

    /** @type {JSEnhancer} */
    JSMeth = null

    /** @type {FileManager} */
    fileMeth = null

    /**
     * Enhace and bundler HTML imports files and save it in minFile attribute
     * @param {String} inPath Input raw HTML file
     * @param {String} outPath Output bundler HTML file
     * @param {String} language Language selected by user
     */
    constructor(inPath, outPath, language) {
        this.inFile = inPath
        this.outFile = outPath
        this.localLang = language
        this.idMemory = new IdAllocator()
        this.HTMLMeth = new HTMLEnhancer()
        this.CSSMeth = new CSSEnhancer()
        this.JSMeth = new JSEnhancer()
        this.fileMeth = new FileManager()
    }

    /**
     * Remove every unnecesary white spaces and comments for every linked file
     * or script.
     */
    enhace() {
        this.minFile = this.HTMLMeth.enhancer(this.rawHTML,this.idMemory)
    }

    /**
     * 
     * @param {String} path Path of file to open
     * @param {String} type Type of file, allowed: CSS, JS and HTML
     */
    openFile(path, type) {
        if (type == "HTML") {
            this.rawHTML = this.fileMeth.readFile(this.inFile, this.localLang)
        }
    }
}