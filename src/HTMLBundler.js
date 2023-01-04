import { argv } from 'node:process'
import ArgumentValidator from './ArgumentValidator.js'
import Bundlier from './Bundlier.js';

// Validamos los argumentos del usuario
const data = new ArgumentValidator(argv);
const bun = new Bundlier(data.InFilePath,data.OutFilePath, data.LANG)
bun.enhace()