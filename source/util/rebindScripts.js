export default function RebindScripts() {
  const body = document.getElementsByTagName("body")[0];
  const script = document.getElementById("main-script");

  if (script) {
    body.removeChild(script);
    const rebinded = document.createElement("script");
    rebinded.src =
      script.getAttribute("src").split("?")[0] +
      "?v=" +
      Math.floor(Math.random() * 999999);
    body.appendChild(rebinded);
  }
}
