import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

export async function getAllUsers() {
  console.log('Getting all users...');
  
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    console.log(`Found ${querySnapshot.size} users`);
    
    const users = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    }));
    
    console.log('Users loaded successfully');
    return users;
  } catch (error) {
    console.error('Error loading users:', error);
    toast.error('Failed to load users');
    return [];
  }
}