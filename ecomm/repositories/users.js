class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;
    fs.accessSync(this.filename);
  }

  async checkForFile() {}
}

const repo = UsersRepository();
