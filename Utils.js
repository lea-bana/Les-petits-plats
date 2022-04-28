class Utils {
  static filterSet(criteria, list) {
    let filteredList = [];
    criteria = criteria.toLowerCase();
    for (let item of list) {
      if (item.toLowerCase().includes(criteria)) {
        filteredList.push(item);
      }
    }
    return filteredList;
  }
}
