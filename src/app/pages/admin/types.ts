// Типы и интерфейсы для административной панели

export interface Master {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
}

export interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  status: "pending" | "approved" | "rejected";
  master_id: number | null;
  assigned_at: string | null;
  created_at: string;
}