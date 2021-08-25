import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
  
private readonly itemsArray =  [
  {
    itemid: 1,
    itemname: 'iphone',
    price: 50000
  },
  {
    itemid: 2,
    itemname: 'samsung',
    price: 40000
  },
  {
    itemid: 3,
    itemname: 'airpods',
    price: 6000
  },
]
  getItem(): any {
    return this.itemsArray;
  }

}
