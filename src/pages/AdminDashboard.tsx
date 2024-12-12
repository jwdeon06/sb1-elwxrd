import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile?.role || userProfile.role !== 'admin') {
      navigate('/');
      return;
    }

    const loadData = async () => {
      try {
        console.log('Loading admin data...');
        
        // Load products
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Products loaded:', productsData);
        setProducts(productsData);

        // Load users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Users loaded:', usersData);
        setUsers(usersData);

      } catch (error) {
        console.error('Error loading admin data:', error);
        toast.error('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userProfile, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Products ({products.length})</h2>
        <div className="grid gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-bold">{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500">No products found</p>
          )}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">USERS TEST ({users.length})</h2>
        <div className="grid gap-4">
          {users.map(user => (
            <div key={user.id} className="border p-4 rounded">
              <p>{user.email}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          ))}
          {users.length === 0 && (
            <p className="text-gray-500">No users found</p>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <p className="font-bold">Debug Info:</p>
        <pre className="mt-2 text-sm overflow-auto">
          {JSON.stringify({ products, users }, null, 2)}
        </pre>
      </div>
    </div>
  );
}