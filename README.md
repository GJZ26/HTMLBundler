# HTML Bundler JS - Es

Read this in [English](#html-bundler-js---en)

Versión: v 2.0.1-dev

**HTML Bundler Js** pretende ser un script de Node JS para unificar las hojas de estilo y script dentro de un mismo archivo minificado de HTML para distribuir tus proyectos estáticos de una forma compacta y hacer más dificil su lectura.

Funcionará para proyectos pequeños y tendrá soporte en inglés y español.

## Uso

```shell
node ./HTMLBundler.js [IDIOMA] [INFO] [-i = ARCHIVO DE ENTRADA] [-o = ARCHIVO DE SALIDA]
```

### IDIOMA
**--español, -es** : Muestra la información, errores y manuales en Español.

**--english, -en** : Muestra la información, errores y manuales en Inglés.

*Default:* English

### INFO
**--version, -v** : Muestra la versión actual del programa.

**--help, -h** : Muestra este mensaje de ayuda.

### ARCHIVO ENTRANTE
Nombre de tu archivo HTML original.

**-i** : Declara el archivo entrante

### ARCHIVO SALIENTE
Nombre de tu archivo HTML empaquetado.

**-o** : Declara el archivo saliente

## Ejemplo
```shell
node ./HTMLBundler.js -es -i index.html -o index-bundled.html
```

# HTML Bundler JS - En

Lea esto en [Español](#html-bundler-js---es)

Version: v 2.0.1-dev

**HTML Bundler Js** is intended to be a Node JS script to unify stylesheets and scripts into a single minified HTML file to distribute your static projects in a compact way and make them harder to read.

It will work for small projects and will have support in English and Spanish.

## Use

```shell
node ./HTMLBundler.js [LANG] [INFO] [-i = INPUT FILE] [-o = OUTPUT FILE]
```

### LANG
**--español, -es** : Displays information, errors and manuals in Spanish.

**--english, -en** : Displays information, errors and manuals in English.

*Default:* English

### INFO
**--version, -v** : Displays the current version of the program.

**--help, -h** : Displays this help message.

### INPUT FILE
The name of your original HTML file.

**-i** : Declare incoming file

### OUTPUT FILE
Name of your bundle HTML file

**-o** : Declare outgoing file

## Example
```shell
node ./HTMLBundler.js -en -i index.html -o index-bundled.html
```