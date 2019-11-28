const through = require("through2"),
  frontMatter = require("frontmatter"),
  { promisify } = require("util"),
  marked = require("marked"),
  hljs = require("highlight.js"),
  pMarked = promisify(marked),
  loadConfig = require("../utils/loadConfig");

const renderer = new marked.Renderer();

renderer.code = function(code, language) {
  if (language === "colors") {
    const colors = code.split("\n");
    let html = '<div class="gryte-colors">';
    for (const color of colors) {
      const array = color.split(":");
      const key = array[0].match(/\$[\S]+/g);
      const value = array[1].match(/#[0-9a-fA-F]+/g);
      html += `<div class="gryte-color-wrap">
      <div class="gryte-color" style="background-color: ${value[0]}"></div>
        <span class="gryte-color__key">${key[0]}</span>
        <span class="gryte-color__value">${value[0]}</span>
      </div>`;
    }

    return `${html}</div>`;
  }
  const coded = hljs.highlight("html", code).value;
  return `<pre><code class="hljs hljs-${language}">${coded}</code></pre>`;
};

module.exports = () => {
  async function handle(file, enc, callback) {
    var self = this;
    let frontmatterData, fileArea, fileName, filePath;

    try {
      frontmatterData = await frontMatter(String(file.contents));
      if (
        !frontmatterData.data ||
        !frontmatterData.data.area ||
        !frontmatterData.data.name
      ) {
        throw ("File is malformed, could not find area and/or name in file: ",
        file.path);
      }
      fileArea = frontmatterData.data.area;
      fileArea = fileArea.replace(" ", "-").toLowerCase();
      fileName = frontmatterData.data.name;
      if (fileName != null) {
        fileName = fileName.replace(" ", "-").toLowerCase();
      } else {
        fileName = file.basename;
      }

      file.contents = Buffer.from(frontmatterData.content);
      file.area = fileArea;
      file.frontMatter = frontmatterData.data;
      file.name = fileName;
      const markdownData = await pMarked(file.contents.toString(), {
        renderer: renderer,
        langPrefix: "hljs "
      });
      file.contents = Buffer.from(markdownData);
      filePath = `${loadConfig("src")}/${fileArea}`;
      file.path = `${filePath}/${fileName}`;
      file.extname = ".html";
      self.push(file);
    } catch (err) {
      callback(err);
    }
    callback();
  }
  return through.obj(handle);
};
