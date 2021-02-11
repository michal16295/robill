export const getReferral = (url, user) => {
  let newUrl = "";
  switch (true) {
    case url === "":
      newUrl = url;
      break;
    case url.includes("localhost") || url.includes("robill.web.app"):
      newUrl = "";
      break;
    case url.includes("www.") && !url.includes("http://"):
      newUrl = `http://${url}`;
      break;
    case !url.includes("www.") && !url.includes("http://"):
      newUrl = `http://www.${url}`;
      break;
    case (url.includes("www.") && url.includes("http://")) ||
      (!url.includes("www.") && url.includes("http://")):
      newUrl = url;
      break;
    default:
      break;
  }

  return newUrl;
};
