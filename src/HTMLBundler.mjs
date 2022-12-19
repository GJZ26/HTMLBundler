import { argv } from 'node:process';
import Validator from './ArgumentValidator.mjs';
import FileManager from './FileManager.mjs';
import Bundlier from './Bundlier.mjs';
import { writeFileSync } from 'node:fs';

const fm = new FileManager()
const data = new Validator(argv)
const HTMLRaw = fm.readFile(data.InFilePath, data.LANG)
const bun = new Bundlier(HTMLRaw)

console.log(bun.HTMLMinified)

// writeFileSync(data.OutFilePath,bun.HTMLMinified.join(""))
/* READING DOCUMENTS */


// HTMLfile.map((line) => {

//     if (line.trim() == "") {
//         return
//     }

//     let currentLine = line
        // .trim()
        // .split("  ")
        // .join(" ")
        // .replace('< ', '<')
        // .replace(' >', '>')
        // .replace("= ", "=")
        // .replace(" =", "=")

//     let splitByCom = currentLine.split('"')

//     splitByCom.map((segment, index) => {

//         if (segment.includes("class=")) {
//             splitByCom[index + 1].split(" ").map((clazz) => {
//                 currentLine.replace(clazz, onClass)
//                 ClassesName[CLASSESANDIDNAMES[onClass++]] = clazz
//             })
//         }

//         if (segment.includes("id=")) {
//             splitByCom[index + 1].split(" ").map((clazz) => {
//                 currentLine.replace(clazz, onClass)
//                 IDName[CLASSESANDIDNAMES[onClass++]] = clazz
//             })
//         }

//     })

//     minifiedHTML.push(currentLine)

// })

// console.log(minifiedHTML)
// // console.log(ClassesName)
// // console.log(IDName)