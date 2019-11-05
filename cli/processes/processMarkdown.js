const through = require("through2"),
  frontMatter = require("frontmatter"),
  { promisify } = require("util"),
  marked = require("marked"),
  pMarked = promisify(marked),
  loadConfig = require("../utils/loadConfig");

const rendrer = {
  render: {
    heading: function(text, level) {
      var escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
      return (
        "<h" + level + ' class="kb-headline">' + text + "</h" + level + ">"
      );
    },
    code: function(code, language) {
      var coded = require("highlightjs").highlightAuto(code).value;
      var button = '<button class="kb-show-btn">Toggle code</button>';
      return (
        '<div class="kb-pre-container">' +
        button +
        '<pre><code class="hljs ' +
        language +
        '">' +
        coded +
        "</code></pre></div>"
      );
    }
  },
  langPrefix: "hljs "
};

module.exports = () => {
  async function handle(file, enc, callback) {
    var self = this;
    let frontmatterData, fileArea, fileName, filePath;

    try {
      frontmatterData = await frontMatter(String(file.contents));
      if (
        frontmatterData.data ||
        frontmatterData.data.area ||
        frontmatterData.data.name
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
      const markdownData = await pMarked(file.contents.toString());
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
