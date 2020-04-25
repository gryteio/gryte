import "./gryte.scss";
import Mount from "./util/mount";

import Navigation from "./navigation/navigation";
import Route from "./util/route";

Mount("js-gryte-nav", Navigation);

window.onhashchange = () => {
  location.reload();
};

Route();
