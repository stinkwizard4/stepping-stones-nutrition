const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Rewrites root-absolute URLs (/css, /images, /about-us, ...) in the output
  // HTML to include the pathPrefix below, so the site works when served from a
  // GitHub Pages subpath (stinkwizard4.github.io/stepping-stones-nutrition/).
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");

  return {
    // If you later move to a custom domain (e.g. www.yoursite.com), change this
    // back to "/" and redeploy.
    pathPrefix: "/stepping-stones-nutrition/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
