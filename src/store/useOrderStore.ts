import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (idOrOrderNumber: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, description?: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,

      addOrder: (newOrder: Order) => {
        set((state) => ({ orders: [newOrder, ...state.orders] }));
      },

      getOrderById: (idOrOrderNumber: string) => {
        return get().orders.find(
          (o) => o.id === idOrOrderNumber || o.orderNumber === idOrOrderNumber
        );
      },

      updateOrderStatus: (orderId: string, status: OrderStatus, description = 'Status updated by hospital pharmacy dispatch.') => {
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.id === orderId || o.orderNumber === orderId) {
              const updatedTimeline = o.timeline.map((step) => {
                if (step.status === status) {
                  return { ...step, completed: true, current: true, description };
                }
                return step;
              });
              return {
                ...o,
                currentStatus: status,
                timeline: updatedTimeline,
              };
            }
            return o;
          }),
        }));
      },
    }),
    {
      name: 'apexorders-storage-v1',
    }
  )
);
