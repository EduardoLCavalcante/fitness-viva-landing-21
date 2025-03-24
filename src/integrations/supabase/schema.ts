
export type Plan = {
  id: number;
  name: string;
  type: string;
  class: string;
  price: string;
  loyalty_price: string;
  description: string | null;
  highlighted: boolean;
  created_at: string;
  updated_at: string;
}

export type PlanFeature = {
  id: number;
  plan_id: number;
  feature: string;
  created_at: string;
}

export type TemporaryRate = {
  id: number;
  name: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export type SpecialDate = {
  id: number;
  month: string;
  type: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type BusinessHour = {
  id: number;
  day_of_week: string;
  opening_time: string;
  closing_time: string;
  type: string;
  created_at: string;
  updated_at: string;
}
