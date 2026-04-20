import axios from 'axios';
import type { ServiceCategory, OrderCreatePayload, OrderCreateResponse, OrderOut } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function getServices(): Promise<ServiceCategory[]> {
  const { data } = await api.get<ServiceCategory[]>('/services');
  return data;
}

export async function getService(serviceId: number) {
  const { data } = await api.get(`/services/${serviceId}`);
  return data;
}

export async function createOrder(payload: OrderCreatePayload): Promise<OrderCreateResponse> {
  const { data } = await api.post<OrderCreateResponse>('/orders', payload);
  return data;
}

export async function getOrder(trackingId: string): Promise<OrderOut> {
  const { data } = await api.get<OrderOut>(`/orders/${trackingId}`);
  return data;
}
