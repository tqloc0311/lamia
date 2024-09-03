import { IAddress } from '@lamia/models/address';
import { fetchData, postData } from '../networkLayer';
import { OrderProduct } from '@lamia/models/product-attribute';

export const fetchPaymentMethods = async () => {
  return fetchData('orders/payments');
};

export const checkCoupon = async (coupon_code: string) => {
  return postData('orders/coupon', { coupon_code });
};

export const makeOrder = async (args: {
  address: IAddress;
  shipping_option: string;
  shipping_method: string;
  payment_method: string;
  description: string | undefined;
  coupon_code: string | undefined;
  products: OrderProduct[];
}) => {
  const {
    address,
    shipping_option,
    shipping_method,
    payment_method,
    description,
    coupon_code,
    products,
  } = args;
  const amount = products.reduce((acc, item) => acc + item.price * item.qty, 0);
  const params = {
    address,
    shipping_option,
    shipping_method,
    amount,
    payment_method,
    description,
    coupon_code,
    products,
  };
  return postData('orders', params);
};

export const fetchOrders = () => {
  return fetchData('orders');
};

export const fetchOrderDetail = (id: number) => {
  return fetchData(`orders/${id}`);
};

export const fetchShippingOptions = (order_total: number) => {
  return fetchData('orders/shipping', { order_total });
};
