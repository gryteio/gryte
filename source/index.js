import Mount from "./util/mount";

import Navigation from "./navigation/navigation";
import Route from "./util/route";

Mount("js-gryte-nav", Navigation);

window.onhashchange = () => {
  location.reload();
  /*Route();
  const menu = document.querySelector(".gryte-menu"),
    main = document.getElementById("gryte-main");

  menu.removeAttribute("style");
  main.removeAttribute("style");
  */
};

Route();
