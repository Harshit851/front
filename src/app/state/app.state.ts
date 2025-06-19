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

// ✅ Add this: ProductsState to match reducer
export interface ProductsState {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export interface AppState {
  products: ProductsState; // ✅ Was Product[], now full object
  cart: CartItem[];
  auth: AuthState;
}
