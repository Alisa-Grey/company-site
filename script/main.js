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
	// tabs
	const tabLinks = document.querySelectorAll('.tab__link');
	const tabs = document.querySelectorAll('.tab__content');

	tabLinks.forEach((link) =>
		addEventListener('click', function (e) {
			e.target === link
				? link.classList.add('is-active')
				: link.classList.remove('is-active');

			// uncomment to show vacancies
			tabs.forEach((tab) => {
				tab.id === e.target.dataset.link
					? tab.classList.add('is-shown')
					: tab.classList.remove('is-shown');
			});
		})
	);
});
