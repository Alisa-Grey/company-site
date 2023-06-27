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
  </footer>
    `;
	}
}

customElements.define('footer-component', Footer);
