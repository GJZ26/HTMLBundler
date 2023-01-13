import IdAllocator from "./IdAllocator.js";

export default class CSSEnhancer{

    /** @type {IdAllocator} */
    Allocators = null

    enhancer(file){
        this.Allocators = IdAllocator
    }

}