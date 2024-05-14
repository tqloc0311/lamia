interface User {
  id: number;
}

class User {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  static parseFromJSON(json: any): User {
    return new User(json.id);
  }
}

export default User;
