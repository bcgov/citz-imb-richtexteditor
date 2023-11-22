export const sanitizeContent = (htmlContent: string): string => {
  // Define an allowlist of allowed tags
  const allowlist = ["p", "br", "h", "ul", "ol", "li", "b", "i", "s", "u", "a"];

  // Remove DOCTYPE, XML declarations, <link> tags, and inline styles
  htmlContent = htmlContent.replace(/<!DOCTYPE.*?>/gi, "");
  htmlContent = htmlContent.replace(/<\?xml.*?\?>/gi, "");
  htmlContent = htmlContent.replace(/<link.*?>/gi, "");
  htmlContent = htmlContent.replace(/ style=".*?"/gi, "");
  htmlContent = htmlContent.replace(/ style='.*?'/gi, "");

  // Remove <script>, <style>, <iframe>, <form>, <object>, <embed>, <applet>, and event handlers
  const forbiddenTags =
    /<script.*?>.*?<\/script>|<iframe.*?>.*?<\/iframe>|<form.*?>.*?<\/form>|<object.*?>.*?<\/object>|<embed.*?>.*?<\/embed>|<applet.*?>.*?<\/applet>|<style.*?>.*?<\/style>/gi;
  htmlContent = htmlContent.replace(forbiddenTags, "");

  // Remove event handlers, javascript: URLs, data URLs, and XML/namespace attributes
  htmlContent = htmlContent.replace(/ on\w+=".*?"/gi, "");
  htmlContent = htmlContent.replace(/ on\w+='.*?'/gi, "");
  htmlContent = htmlContent.replace(/ javascript:.*?/gi, "");
  htmlContent = htmlContent.replace(/ data:.*?/gi, "");
  htmlContent = htmlContent.replace(/ xml\w+=".*?"/gi, "");
  htmlContent = htmlContent.replace(/ xmlns=".*?"/gi, "");

  // Filter out tags that are not in the allowlist
  const tagBody = "(?:[^\"'>]|\"[^\"]*\"|'[^']*')*";
  const tagOrComment = new RegExp(
    "<(?:" +
      // Comment body.
      "!--(?:(?:-*[^->])*--+|-?)" +
      // Special "raw text" elements whose content should be elided.
      "|script\\b" +
      tagBody +
      ">[\\s\\S]*?</script\\s*" +
      "|style\\b" +
      tagBody +
      ">[\\s\\S]*?</style\\s*" +
      // Regular name
      "|/?[a-z]" +
      tagBody +
      ")>",
    "gi"
  );

  let oldHtml;
  do {
    oldHtml = htmlContent;
    htmlContent = htmlContent.replace(tagOrComment, (tag) => {
      return tag.toLowerCase().match(/<\/?([a-z]+)/) &&
        allowlist.indexOf(RegExp.$1) > -1
        ? tag
        : "";
    });
  } while (htmlContent !== oldHtml);

  return htmlContent;
};
