import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderListModel } from '../models/OrderListModel';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  /* Order Status List stored as an Array */
  orderStatusList: Array<string> = ['Order Received','Preparing','Ready to Serve'];
  orderList: Array<OrderListModel> = [];
  /* Default Currency is added */
  currency: string = 'Rs. ';
  _jsonURL: string = 'assets/orderdata.json';
  selectedOrder: OrderListModel = new OrderListModel();

  /* HttpClient added as Dependency Injection in order to use for Getting the data */
  constructor(private httpClient: HttpClient) {
    
   }

  ngOnInit(): void {
    const orderPromise = this.httpClient.get(this._jsonURL).toPromise();

    orderPromise.then((data)=> {
      /* Converting from Object to the Specific model type */
      this.orderList = data as Array<OrderListModel>;

      /* Used map concept for calculating the total amount for all items for the each order */
      this.orderList.map((order) => {
        const amountList: Array<number> = order.items.map((singleOrder) => singleOrder.price);
        /* Used reduce concept to calculate the amount for the order */
        const totalAmount = amountList.reduce(this.calculateAmount, 0);
        order.totalPrice = totalAmount;
      })
    }).catch((err) => {
      /* If the File is missing from the place, it will throw the error. */
      alert("Error reading file.")
    })
  }

  calculateAmount(current: number, value: number) {
    return current + value;
  }

  /* OnClicking of Change Status button, moving the order status to next. */
  changeStatus(order: OrderListModel) {
    if (confirm("Do you wish to change the order status?")) {
      order.status += 1;
    }
  }

  /* Showing Order details based on the clicked row index */
  showOrderDetails(index: number) {
    this.selectedOrder = this.orderList[index];
  }

}
