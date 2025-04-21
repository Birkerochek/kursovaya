import { useUsers } from "@/app/admin/hooks/useUsers";
import { ChangeEvent, useState } from "react";

export default function useUsersSearch() {
  const { users, updateUserRole } = useUsers();
    const [searchQuery, setSearchQuery] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin' | 'master') => {
    try {
      setUpdatingUserId(userId);
      await updateUserRole(userId, newRole);
    } finally {
      setUpdatingUserId(null);
    }
  };
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = searchQuery.trim()
    ? users.filter((user) => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

    return {
        handleSearchChange,
        filteredUsers,
        searchQuery,
        updatingUserId,
        handleRoleChange,

    }
}