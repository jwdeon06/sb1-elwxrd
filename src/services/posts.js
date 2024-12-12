import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

export async function createPost(postData) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(id, updates) {
  try {
    const docRef = doc(db, 'posts', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function deletePost(id) {
  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function getPost(id) {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
}

export async function getAllPosts() {
  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
}