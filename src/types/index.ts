export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'member';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Product' | 'Service';
  subcategory: string;
  images: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
  stripeProductId?: string;
  stripePriceId?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  tags: string[];
  featuredImage?: string;
}

export interface LibraryCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}