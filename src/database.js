import Datastore from "./assets/Database.json";

export default class Database {
  getdata = () => Datastore;

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
    return data.find(({ uniqueKey }) => uniqueKey === getID);
  };
}
