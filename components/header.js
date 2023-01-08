class Header extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML = `
		<header class="header">
			<a
				class="header__logo link-reset"
				href="https://heapp.games/"
				aria-label="Heapp Games"
			>
				<img class="header__logo-img" src="./assets/images/heapp_logo.png" alt="HeappGames logo" />
			</a>
			<div class="burger-container">
				<input type="checkbox" class="toggle-menu" id="toggle-menu" />
				<div class="burger-lines">
					<span class="line line1"></span>
					<span class="line line2"></span>
					<span class="line line3"></span>
				</div>
			</div>
			<nav id="menu" class="nav">
				<ul class="nav-list list-reset">
					<li class="nav-list__item">
						<a class="nav-list__link link-reset" href="index.html" tabindex="0">
							Проекты
						</a>
					</li>
					<li class="nav-list__item">
						<a class="nav-list__link link-reset" href="about.html" tabindex="0">
							Все о нас
						</a>
					</li>
					<li class="nav-list__item">
						<a class="nav-list__link link-reset" href="jobs.html" tabindex="0">
							Вакансии
						</a>
					</li>
					<li class="nav-list__item">
						<a
							class="nav-list__link link-reset"
							href="services.html"
							tabindex="0"
						>
							Услуги
						</a>
					</li>
					<li class="nav-list__item">
						<a
							class="nav-list__link link-reset"
							href="contacts.html"
							tabindex="0"
						>
							Контакты
						</a>
					</li>
				</ul>
			</nav>
		</header>
    `;
	}
}

customElements.define('header-component', Header);
