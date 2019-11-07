export default class Navigation {
  constructor(element) {
    const menu = element.querySelector(".gryte-menu");
    if (menu !== null) {
      element.addEventListener("click", () => {
        menu.classList.toggle("gryte-menu--active");
        menu.setAttribute("aria-hidden", "false");
        menu.setAttribute("aria-expanded", "true");
      });
    }
  }
}
