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
	const navItems = document.querySelectorAll('.about-thumb-img');
	for (let [index, slide] of Array.from(sliderElem).entries()) {
		const sliderBtn = document.createElement('button');
		sliderBtn.classList.add('btn-reset', 'about-slider__btn');
		sliderBtn.setAttribute('id', `btn-${index}`);
		slide.setAttribute('id', `slide-${index}`);
		sliderBtn.setAttribute('aria-label', 'Поменять слайд');
		sliderBtn.addEventListener('click', () => {
			changeSlide(index, sliderElem);
			toggleClass(
				index,
				Array.from(document.querySelectorAll('.about-slider__btn')),
				'is-active'
			);

			navItems.forEach((item) => {
				if (Number(item.dataset.target) === index) {
					toggleClass(index, item.closest('li'), 'is-active');
				}
			});
		});
		sliderControls.append(sliderBtn);
	}

	document.getElementById(`btn-${currentIndex}`).classList.toggle('is-active');
};
function changeSlide(i, sliderElem) {
	currentIndex = i;
	Array.from(sliderElem).forEach((item, index) => {
		if (index === currentIndex) {
			item.classList.add('highlight');
			document.querySelector('.slider-container').style.minHeight = `${
				item.offsetHeight + 40
			}px`;
		} else item.classList.remove('highlight');
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
// touch events
class DraggingEvent {
	constructor(target = undefined) {
		this.target = target;
	}

	event(callback) {
		let handler;

		this.target.addEventListener('mousedown', (e) => {
			e.preventDefault();

			handler = callback(e);

			window.addEventListener('mousemove', handler);

			document.addEventListener('mouseleave', clearDraggingEvent);

			window.addEventListener('mouseup', clearDraggingEvent);

			function clearDraggingEvent() {
				window.removeEventListener('mousemove', handler);
				window.removeEventListener('mouseup', clearDraggingEvent);

				document.removeEventListener('mouseleave', clearDraggingEvent);

				handler(null);
			}
		});

		this.target.addEventListener('touchstart', (e) => {
			handler = callback(e);

			window.addEventListener('touchmove', handler);

			window.addEventListener('touchend', clearDraggingEvent);

			document.body.addEventListener('mouseleave', clearDraggingEvent);

			function clearDraggingEvent() {
				window.removeEventListener('touchmove', handler);
				window.removeEventListener('touchend', clearDraggingEvent);

				handler(null);
			}
		});
	}

	// Get the distance that the user has dragged
	getDistance(callback) {
		function distanceInit(e1) {
			let startingX, startingY;

			if ('touches' in e1) {
				startingX = e1.touches[0].clientX;
				startingY = e1.touches[0].clientY;
			} else {
				startingX = e1.clientX;
				startingY = e1.clientY;
			}

			return function (e2) {
				if (e2 === null) {
					return callback(null);
				} else {
					if ('touches' in e2) {
						return callback({
							x: e2.touches[0].clientX - startingX,
							y: e2.touches[0].clientY - startingY,
						});
					} else {
						return callback({
							x: e2.clientX - startingX,
							y: e2.clientY - startingY,
						});
					}
				}
			};
		}

		this.event(distanceInit);
	}
}

class CardCarousel extends DraggingEvent {
	constructor(container, controller = undefined) {
		super(container);

		// DOM elements
		this.container = container;
		this.controllerElement = controller;
		this.slides = container.querySelectorAll('.about-slide');

		// Carousel data
		this.centerIndex = (this.slides.length - 1) / 2;
		this.cardWidth =
			(this.slides[0].offsetWidth / this.container.offsetWidth) * 100;
		this.xScale = {};

		// Resizing
		window.addEventListener('resize', this.updateCardWidth.bind(this));

		// Initializers
		this.build();

		// Bind dragging event
		super.getDistance(this.moveSlides.bind(this));
	}

	updateCardWidth() {
		this.cardWidth =
			(this.slides[0].offsetWidth / this.container.offsetWidth) * 100;

		this.build();
	}

	build(fix = 0) {
		for (let i = 0; i < this.slides.length; i++) {
			const x = i - this.centerIndex;
			const scale = this.calcScale(x);
			const scale2 = this.calcScale2(x);
			const zIndex = -Math.abs(i - this.centerIndex);

			const leftPos = this.calcPos(x, scale2);

			this.xScale[x] = this.slides[i];

			this.updateSlides(this.slides[i], {
				x: x,
				scale: scale,
				leftPos: leftPos,
				zIndex: zIndex,
			});
		}
	}

	controller(e) {
		const temp = { ...this.xScale };

		this.xScale = temp;

		for (let x in temp) {
			const scale = this.calcScale(x),
				scale2 = this.calcScale2(x),
				leftPos = this.calcPos(x, scale2),
				zIndex = -Math.abs(x);

			this.updateSlides(this.xScale[x], {
				x: x,
				scale: scale,
				leftPos: leftPos,
				zIndex: zIndex,
			});
		}
	}

	calcPos(x, scale) {
		let formula;

		if (x < 0) {
			formula = (scale * 100 - this.cardWidth) / 2;
			return formula;
		} else if (x > 0) {
			formula = 100 - (scale * 100 + this.cardWidth) / 2;
			return formula;
		} else {
			formula = 100 - (scale * 100 + this.cardWidth) / 2;
			return formula;
		}
	}

	updateSlides(card, data) {
		if (data.x || data.x == 0) {
			card.setAttribute('data-x', data.x);
		}
		if (data.leftPos) {
			card.style.left = '0%';
		}

		if (data.zIndex || data.zIndex == 0) {
			if (data.zIndex == 0) {
				card.classList.add('highlight');
				if (card.dataset.x == 0) {
					let index = card.getAttribute('id').split('-')[1];
					document.querySelector('.slider-container').style.minHeight = `${
						card.offsetHeight + 40
					}px`;
					toggleClass(
						index,
						Array.from(document.querySelectorAll('.about-slider__btn')),
						'is-active'
					);
					toggleClass(
						index,
						Array.from(document.querySelectorAll('.about__thumbnail')),
						'is-active'
					);
				}
			} else {
				card.classList.remove('highlight');
			}

			card.style.zIndex = data.zIndex;
		}
	}

	calcScale2(x) {
		let formula;

		if (x <= 0) {
			formula = 1 - (-1 / 5) * x;

			return formula;
		} else if (x > 0) {
			formula = 1 - (1 / 5) * x;

			return formula;
		}
	}

	calcScale(x) {
		const formula = 1 - (1 / 5) * Math.pow(x, 2);

		if (formula <= 0) {
			return 0;
		} else {
			return formula;
		}
	}

	checkOrdering(card, x, xDist) {
		const original = parseInt(card.dataset.x);
		const rounded = Math.round(xDist);
		let newX = x;

		if (x !== x + rounded) {
			if (x + rounded > original) {
				if (x + rounded > this.centerIndex) {
					newX =
						x + rounded - 1 - this.centerIndex - rounded + -this.centerIndex;
				}
			} else if (x + rounded < original) {
				if (x + rounded < -this.centerIndex) {
					newX =
						x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
				}
			}

			this.xScale[newX + rounded] = card;
		}

		const temp = -Math.abs(newX + rounded);

		this.updateSlides(card, { zIndex: temp });

		return newX;
	}

	moveSlides(data) {
		let xDist;

		if (data != null) {
			this.container.classList.remove('smooth-return');
			xDist = data.x / 250;
		} else {
			this.container.classList.add('smooth-return');
			xDist = 0;

			for (let x in this.xScale) {
				this.updateSlides(this.xScale[x], {
					x: x,
					zIndex: Math.abs(Math.abs(x) - this.centerIndex),
				});
			}
		}

		for (let i = 0; i < this.slides.length; i++) {
			const x = this.checkOrdering(
					this.slides[i],
					parseInt(this.slides[i].dataset.x),
					xDist
				),
				scale = this.calcScale(x + xDist),
				scale2 = this.calcScale2(x + xDist),
				leftPos = this.calcPos(x + xDist, scale2);

			this.updateSlides(this.slides[i], {
				scale: scale,
				leftPos: leftPos,
			});
		}
	}
}

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
