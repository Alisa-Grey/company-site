class Footer extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML = `
    <footer class="footer">
    <p class="footer__text">
      Heapp Games &copy;&nbsp;2021. Все права сохранены
    </p>
    <a class="footer__link link-reset" href="social_responsibility.html"
      >Социальная ответственность</a
    >
  </footer>
    `;
	}
}

customElements.define('footer-component', Footer);
