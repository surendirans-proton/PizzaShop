export class OrderListModel {
    customerName: string;
    status: number;
    items: Array<OrderModel> = [];
    address: string;
    totalPrice: number;
    constructor() {
        this.customerName = '';
        this.status = 0;
        this.address = '';
        this.totalPrice = 0;
    }
}

class OrderModel {
    itemName: string;
    price: number;

    constructor() {
        this.itemName = '';
        this.price = 0;
    }
}