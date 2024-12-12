import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

export async function getAllProducts() {
  console.log('Getting all products...');
  
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc')
    );
    
    console.log('Executing products query...');
    const querySnapshot = await getDocs(q);
    console.log(`Found ${querySnapshot.size} products`);
    
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Products loaded successfully');
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    toast.error('Failed to load products');
    return [];
  }
}