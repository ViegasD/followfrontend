export interface Service {
  service: number;
  name: string;
  type: string;
  category: string;
  rate: string;
  min: string;
  max: string;
  refill: boolean;
  cancel: boolean;
}

export interface ServiceCategory {
  category: string;
  services: Service[];
}

export interface OrderCreatePayload {
  service_id: number;
  link: string;
  quantity: number;
  email: string;
  extra_data?: Record<string, unknown>;
}

export interface OrderCreateResponse {
  tracking_id: string;
  init_point: string;
}

export interface OrderOut {
  tracking_id: string;
  email: string;
  service_id: number;
  service_name: string;
  link: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  status: string;
  baratosociais_order_id: number | null;
  created_at: string;
  updated_at: string;
  charge: string | null;
  start_count: string | null;
  remains: string | null;
  currency: string | null;
}
