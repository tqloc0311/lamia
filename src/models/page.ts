interface IPage {
  id: number;
  name: string;
  content: string;
  image: string;
}

class Page implements IPage {
  id: number;
  name: string;
  content: string;
  image: string;

  constructor(data: IPage) {
    this.id = data.id;
    this.name = data.name;
    this.content = data.content;
    this.image = data.image;
  }
}

export default Page;
