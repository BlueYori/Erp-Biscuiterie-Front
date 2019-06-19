import { OrderDetails } from '../orderDetails-service/order-details';

export class Order {
    id: number;
    date: string;
    price: number;
    customerId: number;
    stateId: number;
    orderDetails: OrderDetails[];
}
