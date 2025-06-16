
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AuthState {
  token: string | null;
  user: any | null;
  error: string | null;
  loading: boolean;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  auth: AuthState;
}