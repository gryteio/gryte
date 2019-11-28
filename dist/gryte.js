function Mount(className, Module) {
  var targets = document.getElementsByClassName(className);

  for (var i = targets.length - 1; i >= 0; i -= 1) {
    new Module(targets[i], className);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Navigation = function Navigation(element) {
  _classCallCheck(this, Navigation);

  var menu = document.querySelector(".gryte-menu");
  var closeMenu = menu.querySelector(".gryte-menu__close");
  var main = document.getElementById("gryte-main");

  if (menu !== null) {
    element.addEventListener("click", function () {
      menu.setAttribute("style", "display:block;");
      menu.setAttribute("aria-hidden", "false");
      menu.setAttribute("aria-expanded", "true");

      if (main !== null) {
        main.setAttribute("style", "display:none;");
      }
    });
  }

  if (closeMenu !== null) {
    closeMenu.addEventListener("click", function () {
      if (menu !== null) {
        menu.removeAttribute("style");
      }

      if (main !== null) {
        main.removeAttribute("style");
      }
    });
  }
};

function RebindScripts() {
  var body = document.getElementsByTagName("body")[0];
  var script = document.getElementById("main-script");

  if (script) {
    body.removeChild(script);
    var rebinded = document.createElement("script");
    rebinded.src = script.getAttribute("src").split("?")[0] + "?v=" + Math.floor(Math.random() * 999999);
    body.appendChild(rebinded);
  }
}

function Route() {
  var main = document.getElementById("gryte-main");
  var route = window.location.href.split("#")[1];

  if (!route || route === "") {
    return;
  }

  var pattern = "[href*=\"#".concat(route, "\"]");
  var item = document.querySelector(pattern);

  if (item) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./".concat(item.dataset.path));
    xhr.send(null);

    xhr.onreadystatechange = function () {
      var DONE = 4,
          OK = 200;

      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          main.innerHTML = xhr.responseText;
          RebindScripts();
        }
      }
    };
  }
}

Mount("js-gryte-nav", Navigation);

window.onhashchange = function () {
  location.reload();
  /*Route();
  const menu = document.querySelector(".gryte-menu"),
    main = document.getElementById("gryte-main");
   menu.removeAttribute("style");
  main.removeAttribute("style");
  */
};

Route();
