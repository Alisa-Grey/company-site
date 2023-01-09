document.addEventListener('DOMContentLoaded', () => {
	// sticky header
	const main = document.querySelector('.main');
	const header = document.querySelector('#header');

	const makeHeaderSticky = () => {
		let scrollTop = window.scrollY;
		let stickyStartPosition = main.offsetHeight / 4;

		if (scrollTop >= stickyStartPosition) {
			header.classList.add('sticky');
			main.style.marginTop = `${header.offsetHeight}px`;
		} else {
			header.classList.remove('sticky');
			main.style.marginTop = `0px`;
		}
	};

	window.addEventListener('scroll', () => {
		makeHeaderSticky();
	});
	// menu
	document.querySelector('#toggle-menu').addEventListener('click', function () {
		document.querySelector('.burger__lines').classList.toggle('is-active');
		document.querySelector('.nav').classList.toggle('is-active');
	});
});
