// client/src/data/orders.ts
export interface Order {
  id: string;
  user: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  date: string; // ISO date
}

export const mockOrders: Order[] = [
  {
    id: "1001",
    user: "alice",
    total: 49.99,
    status: "Pending",
    date: "2025-07-01T10:15:00.000Z",
  },
  {
    id: "1002",
    user: "bob",
    total: 129.5,
    status: "Shipped",
    date: "2025-06-28T14:30:00.000Z",
  },
  {
    id: "1003",
    user: "carol",
    total: 75.0,
    status: "Delivered",
    date: "2025-06-25T09:00:00.000Z",
  },
];
