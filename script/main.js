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
// create employees slider
const activateSlider = (sliderElem, sliderControls, currentIndex = 0) => {
	const navItems = document.querySelectorAll('.about-us-thumb-img');
	for (let [index, slide] of Array.from(sliderElem).entries()) {
		const sliderBtn = document.createElement('button');
		sliderBtn.classList.add('btn-reset', 'about-us-slider__btn');
		sliderBtn.setAttribute('id', `btn-${index}`);
		slide.setAttribute('id', `slide-${index}`);
		sliderBtn.setAttribute('aria-label', 'Поменять слайд');
		sliderBtn.addEventListener('click', () => {
			changeSlide(index, sliderElem);
			toggleClass(
				index,
				Array.from(document.querySelectorAll('.about-us-slider__btn')),
				'is-active'
			);

			navItems.forEach((item) => {
				if (item.dataset.target == index) {
					toggleClass(index, item.parentElement, 'is-active');
				}
			});
		});
		sliderControls.append(sliderBtn);
	}

	document.getElementById(`btn-${currentIndex}`).classList.toggle('is-active');
};
// add navigation for touchscreens
let touchstartX = 0,
	touchendX = 0,
	touchstartY = 0,
	touchendY = 0;
let passiveIfSupported = false;
try {
	window.addEventListener(
		'test',
		null,
		Object.defineProperty({}, 'passive', {
			get: function () {
				passiveIfSupported = { passive: false };
			},
		})
	);
} catch (err) {}

function handleTouchStart(e) {
	touchstartX = e.changedTouches[0].screenX;
	touchstartY = e.changedTouches[0].screenY;
}
function handleTouchEnd(e) {
	touchendX = e.changedTouches[0].screenX;
	touchendY = e.changedTouches[0].screenY;
	let diffX = touchendX - touchstartX;
	let diffY = touchendY - touchstartY;
	const targetId = Number(
		e.target.closest('.about-us-slide').getAttribute('id').split('-')[1]
	);
	const lastIndex = Array.from(slides).length - 1;
	if (touchstartX < touchendX && Math.abs(diffX) > Math.abs(diffY)) {
		e.preventDefault();

		targetId !== 0 ? (nextIndex = targetId - 1) : (nextIndex = lastIndex);
	} else if (touchstartX > touchendX && Math.abs(diffX) > Math.abs(diffY)) {
		e.preventDefault();
		targetId !== lastIndex ? (nextIndex = targetId + 1) : (nextIndex = 0);
	} else {
		nextIndex = targetId;
		window.scrollBy({
			top: -diffY * 3,
			left: 0,
			behavior: 'smooth',
		});
	}
	changeSlide(nextIndex, slides);
	toggleClass(
		nextIndex,
		Array.from(document.querySelectorAll('.about-us-slider__btn')),
		'is-active'
	);
}
function changeSlide(i, sliderElem) {
	currentIndex = i;
	Array.from(sliderElem).forEach((item, index) => {
		index === currentIndex
			? item.classList.remove('hidden')
			: item.classList.add('hidden');
	});
}
function toggleClass(i, targetEl, targetClass) {
	if (Array.isArray(targetEl)) {
		targetEl.forEach((btn) => {
			btn.classList.remove(targetClass);
		});
		targetEl[i].classList.add(targetClass);
	} else {
		targetEl.classList.add(targetClass);
		const siblings = getSiblings(targetEl);
		siblings.forEach((el) => el.classList.remove(targetClass));
	}
}
let getSiblings = function (e) {
	let siblings = [];
	if (!e.parentNode) {
		return siblings;
	}
	let sibling = e.parentNode.firstChild;
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== e) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
};
// animate elements on scroll
scrollElements = Array.from(document.getElementsByClassName('js-scroll'));
let options = {
	root: null,
	threshold: 0.1,
};
let cb = (entries) => {
	entries.forEach((entry) => {
		entry.isIntersecting
			? entry.target.classList.add('scrolled')
			: entry.target.classList.remove('scrolled');
	});
};
let observer = new IntersectionObserver(cb, options);

scrollElements.forEach((el) => observer.observe(el));
