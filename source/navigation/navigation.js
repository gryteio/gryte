export default class Navigation {
  constructor(element) {
    const openButton = element.querySelector(".gryte-nav__open");
    const menu = element.querySelector(".gryte-menu");
    if (openButton !== null) {
      openButton.addEventListener("click", () => {
        menu.classList.toggle("gryte-menu--active");
        menu.setAttribute("aria-hidden", "false");
        menu.setAttribute("aria-expanded", "true");
      });
    }
  }
}
