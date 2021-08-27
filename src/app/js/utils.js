export const sort = (data, rule) => {
  let res = [];
  if (data.length) {
    res = data.sort((l, r) => {
      return l.name - r.name;
    })
  }
  return res;
}