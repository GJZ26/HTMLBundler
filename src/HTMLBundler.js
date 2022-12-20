import { argv } from 'node:process';
import Validator from './ArgumentValidator.js';
import FileManager from './FileManager.js';
import Bundlier from './Bundlier.js';

const fm = new FileManager()
const data = new Validator(argv)
const HTMLRaw = fm.readFile(data.InFilePath, data.LANG)
const CSSRaw = {}
const JSRaw = {}
const bun = new Bundlier(HTMLRaw)

for (const k in bun.CSSRecovery) {
    CSSRaw[bun.CSSRecovery[k]] = fm.readFile(fm.rootDir + k, data.LANG)
}

for (const k in bun.JSRecovery) {
    JSRaw[bun.JSRecovery[k]] = fm.readFile(fm.rootDir + k, data.LANG)
}

console.log(JSRaw)
console.log(CSSRaw)
