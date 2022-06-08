class mockModel {
  create(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
}

export default mockModel;
