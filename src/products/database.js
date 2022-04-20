import $ from "jquery";

export default class Database {
  constructor() {
    this.state = {
      db: {
        name: "Database",
        ext: "json",
        path: "https://raw.githubusercontent.com/my-store/products/main/public/", // Production
      },
    };
  }
  getdata = async () => {
    let data = [];
    const { db } = this.state;
    const dbFile = db.path + db.name + "." + db.ext;
    data = await $.getJSON(dbFile, (x) => x);
    return data;
  };
  load = async () => {
    let data = await this.getdata();
    data = await data.reduce((group, product) => {
      const { category } = product;
      group[category] = group[category] ?? [];
      group[category].push(product);
      return group;
    }, {});
    return data;
  };
  getone = async (getID) => {
    let data = await this.getdata();
    return data.find(({ _id }) => _id === getID);
  };
}
