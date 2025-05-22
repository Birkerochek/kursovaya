import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  const { isLoading, error, data, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async() => {
      const { data } = await axios.get<User[]>('/api/users')
      return data
    }
  })



  const updateUserRole = async (userId: string, newRole: 'user' | 'admin' | 'master') => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) throw new Error('Failed to update user role');
      const updatedUser = await response.json();
      
      setUsers(users.map(user => 
        user.id === userId ? updatedUser : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };



  return { updateUserRole, isLoading, data, error, isError };
}