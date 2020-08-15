export class MenuItem{
    constructor(public _id:string,public name:string,public price:number,public description:string,public image:string,public resturant:string ){}
}

export class OrderItem{
    constructor(public _id:string,public name:string,public price:number,public description:string,public image:string,public resturant:string ,public count:number=0){}
}

export class Order{
    constructor(public userId:string,public orderItems:OrderItem[],public deliveryCharges:number,public gstAmount:number,
        public totalAmount:number,public deliveryAddress:string,public postalcode:number,
        public createdAt:Date=new Date(),public updatedAt:Date=new Date()){}
}