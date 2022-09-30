// Gulp nos brinda estas 2 funciones
// funcion src, sirve para identificar un archivo o fuente
// funcion dest, permite almacenar archivos en una carpeta destino

//Gulp
const { src, dest, watch, parallel } = require('gulp');
//  Se debe instalar dependencia gulp-sass para que pueda funcionar
const sass = require('gulp-sass')(require('sass'));

const plumber = require('gulp-plumber');

function css(done) {
	src('src/scss/**/*.scss') //Identificando TODOS los archivos SASS dentro de una carpeta
		.pipe(plumber()) //Plumber hace que no se detenga el workflow/tarea y tengamos que volver a ejecutar las tareas
		.pipe(sass()) //Compilarlo
		.pipe(dest('build/css')); //Guardar en el disco
	done(); //Callback que avisa a gulp cuando llegamos al final
}

function javascript(done) {
	src('src/js/**/*.js').pipe(dest('build/js'));
	done();
}

function dev(done) {
	watch('src/scss/**/*.scss', css); //Watch a la funcion de css
	watch('src/js/**/*.js', javascript); //Watch a la funcion de javascript
	done();
}

exports.css = css;
exports.js = javascript;
exports.dev = parallel(javascript, dev);
