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

  var openButton = element.querySelector(".gryte-nav__open");
  var menu = element.querySelector(".gryte-menu");

  if (openButton !== null) {
    openButton.addEventListener("click", function () {
      menu.classList.toggle("gryte-menu--active");
      menu.setAttribute("aria-hidden", "false");
      menu.setAttribute("aria-expanded", "true");
    });
  }
};

function Route() {
  var main = document.getElementById("gryte-main");
  var route = window.location.href.split("#")[1];

  if (!route || route == "") {
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
        }
      }
    };
  }
}

Mount('gryte-nav', Navigation);

window.onhashchange = function () {
  Route();
  var menu = document.querySelector('.gryte-menu');
  menu.classList.toggle('gryte-menu--active');
};

Route();
