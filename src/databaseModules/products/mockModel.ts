import { Model } from 'mongoose';
class mockModel {
  calls = 0;
  create(data: any): Promise<any> {
    this.calls++;
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
}

export default mockModel;
