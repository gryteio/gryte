import RebindScripts from "./rebindScripts";

export default function Route() {
  const main = document.getElementById("gryte-main");
  const route = window.location.href.split("#")[1];

  if (!route || route === "") {
    return;
  }

  const pattern = `[href*="#${route}"]`;
  const item = document.querySelector(pattern);

  if (item) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `./${item.dataset.path}`);
    xhr.send(null);
    xhr.onreadystatechange = () => {
      var DONE = 4,
        OK = 200;
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          main.innerHTML = xhr.responseText;
          RebindScripts();
          const body = document.getElementsByTagName("body")[0];
          const pageScripts = main.querySelectorAll("script");
          for (let i = 0; pageScripts.length > i; i++) {
            const script = document.createElement("script");
            script.innerHTML = pageScripts[i].innerHTML;
            body.appendChild(script);
          }
        }
      }
    };
  }
}
