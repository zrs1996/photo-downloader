import { sort } from "src/app/js/utils.js";

export function checkoutImgs(catalog, query) {
  if (!catalog) return null;
  const res = {};
  const resList = [];
  for (const key in catalog) {
    res[key] = {
      title: catalog[key].title,
    };
    (catalog[key].list || []).forEach((img) => {
      if (img.style.offsetHeight && img.style.offsetWidth) {
        if (img.style.offsetHeight < 300 && img.style.offsetWidth < 300) return;
      }
      const _img = img;
      if (!img.src && img.outerHTML) {
        const srcArr = img.outerHTML.split(' src="');
        const dataSrcArr = img.outerHTML.split('src="');
        if (srcArr.length && srcArr[1]) {
          _img.src = srcArr[1].split('"')[0];
        } else if (dataSrcArr.length && dataSrcArr[1]) {
          _img.src = dataSrcArr[1].split('"')[0];
        }
      }
      if (_img.src) {
        const splitArr = _img.src.split("/");
        _img.fullName = splitArr[splitArr.length - 1];
        if (_img.fullName.indexOf(".") >= 0) {
          const fullNameArr = _img.fullName.split(".");
          _img.name = fullNameArr[0];
          _img.type = fullNameArr[1];
        }
      }
      resList.push(_img);
    });
    res[key].list = sort(resList);
  }
  return res;
}
