import { argv } from 'node:process'

import FileManager from './FileVerifier.js'
import Validator from './ArgumentValidator.js'
import HTMLEnhancer from './HTMLEnhancer.js'
import IdAllocator from './IdAllocator.js'

const file = new FileManager()
const args = new Validator(argv)
const id = new IdAllocator()
const html = new HTMLEnhancer()

console.log(html.enhancer(file.readFile(args.InFilePath,args.LANG),id))