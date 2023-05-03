
const sass = require("sass");

const svgSprite = require("eleventy-plugin-svg-sprite");




module.exports = function(eleventyConfig) {


    eleventyConfig.addPassthroughCopy('./src/_data/data.json');
   

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/assets/");
    eleventyConfig.addPassthroughCopy("./src/index.js");
    

    eleventyConfig.addTemplateFormats("scss");
    // Creates the extension for use
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css", // optional, default: "html"

        // `compile` is called once per .scss file in the input directory
        compile: async function(inputContent) {
        let result = sass.compileString(inputContent);

        // This is the render function, `data` is the full data cascade
        return async (data) => {
            return result.css;
        };
        }
    });

    eleventyConfig.addPlugin(svgSprite, [
      {
        path: "./src/assets/desktop", // relative path to SVG directory
        svgSpriteShortcode: "desktopSprite",
      },
      {
        path: "./src/assets/locationSVG", // relative path to SVG directory
        svgSpriteShortcode: "locationSprite",
      },
      {
        path: "./src/assets/logos", // relative path to SVG directory
        svgSpriteShortcode: "logosSprite",
      },
      {
        path: "./src/assets/mobile", // relative path to SVG directory
        svgSpriteShortcode: "mobileSprite",
      },
      {
        path: "./src/assets/tablet", // relative path to SVG directory
        svgSpriteShortcode: "tabletSprite",
      },
    ]);

    // Return your Object options:
    return {

      dir: {
        input: "src",
        output: "_site"
      }
    }
}; 