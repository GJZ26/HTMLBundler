import { argv } from 'node:process'

import Validator from './ArgumentValidator.js'
import FileManager from './FileVerifier.js'
import IdAllocator from './IdAllocator.js'
import Bundlier from './Bundlier.js'

import HTMLCleaner from './HTMLCleaner.js'

const args = new Validator(argv)
const file = new FileManager()
const id = new IdAllocator()
const a = new Bundlier()

const html = new HTMLCleaner()
