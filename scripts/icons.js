const favicons = require("favicons");
const fs = require("fs");
const path = require("path");

const sizes = ["144x144", "180x180", "192x192", "512x512"];

const source = "src/assets/icons/icon.svg";

const configuration = {
  online: false,
  preferOnline: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false,
  },
};

favicons(source, configuration, (err, response) => {
  if (err) throw err;

  response.images
    .filter(({ name }) => {
      if (
        name.includes("favicon.ico") ||
        name.includes("apple-touch-startup-image")
      )
        return true;
      for (const size of sizes) if (name.includes(size)) return true;
      return false;
    })
    .map(({ contents, name }) => ({
      contents,
      name: name.replace("android-chrome", "icon"),
    }))
    .forEach(({ contents, name }) =>
      fs.writeFile(
        path.join(__dirname, "..", "src", "assets", "icons", name),
        contents,
        (err) => {
          if (err) throw err;
        }
      )
    );
});
