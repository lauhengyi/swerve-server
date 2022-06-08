class mockModel {
  calls = 0;
  create(payload: any): Promise<any> {
    this.calls++;
    return new Promise((resolve, reject) => {
      resolve(payload);
    });
  }
  findById(id: string): Promise<any> {
    this.calls++;
    return new Promise((resolve, reject) => {
      resolve({ name: 'Found object' });
    });
  }
  findByIdAndUpdate(id: string): Promise<any> {
    this.calls++;
    return new Promise((resolve, reject) => {
      resolve({ name: 'Updated object' });
    });
  }
  findByIdAndDelete(id: string): Promise<void> {
    this.calls++;
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export default mockModel;
