export default class Navigation {
  constructor(element) {
    const menu = document.querySelector(".gryte-menu");
    const closeMenu = menu.querySelector(".gryte-menu__close");
    const main = document.getElementById("gryte-main");

    if (menu !== null) {
      element.addEventListener("click", () => {
        menu.setAttribute("style", "display:block;");
        menu.setAttribute("aria-hidden", "false");
        menu.setAttribute("aria-expanded", "true");

        if (main !== null) {
          main.setAttribute("style", "display:none;");
        }
      });
    }

    if (closeMenu !== null) {
      closeMenu.addEventListener("click", () => {
        if (menu !== null) {
          menu.removeAttribute("style");
        }
        if (main !== null) {
          main.removeAttribute("style");
        }
      });
    }
  }
}
