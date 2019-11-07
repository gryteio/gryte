import Mount from "./util/mount";

import Navigation from "./navigation/navigation";
import Route from "./util/route";

Mount("js-gryte-nav", Navigation);

window.onhashchange = () => {
  Route();
  const menu = document.querySelector(".gryte-menu");
  menu.classList.toggle("gryte-menu--active");
};

Route();
