'use strict';

/* Menu (funcion anonima auto ejecutable "Encapsulada") */

((d) => {
	//variables del dom se inician con $
	const $btnMenu = d.querySelector('.menu-btn'),
		$menu = d.querySelector('.menu');

	//programando evento click al boton menu
	$btnMenu.addEventListener('click', (e) => {
		$btnMenu.firstElementChild.classList.toggle('none');
		$btnMenu.lastElementChild.classList.toggle('none');
		$menu.classList.toggle('is-active');
	});

	//programando rutina que cuando detecte un click en algun enlace dentro del menu, quite la clase is-active e intercambie la clase none

	//tecnica de delegacion de eventos
	d.addEventListener('click', (e) => {
		if (!e.target.matches('.menu a')) return false;

		$btnMenu.firstElementChild.classList.remove('none');
		$btnMenu.lastElementChild.classList.add('none');
		$menu.classList.remove('is-active');
	});
})(document);

/****************** Contact Form *********************/

((d) => {
	const $form = d.querySelector('.contact-form'),
		$loader = d.querySelector('.contact-form-loader'),
		$response = d.querySelector('.contact-form-response');

	$form.addEventListener('submit', (e) => {
		e.preventDefault();
		$loader.classList.remove('none');
		fetch('https://formsubmit.co/ajax/waltherawad@gmail.com', {
			method: 'POST',
			body: new FormData(e.target),
		})
			.then((res) => (res.ok ? res.json() : Promise.reject(res)))
			.then((json) => {
				console.log(json);
				location.hash = '#gracias';
				$form.reset();
			})
			.catch((err) => {
				console.log(err);
				let message = err.statusText || 'Ocurrio un error al enviar, intenta nuevamente';
				$response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;
			})
			.finally(() => {
				$loader.classList.add('none');
				setTimeout(() => {
					location.hash = '#close';
				}, 3000);
			});
	});
})(document);
