import { useEffect, useState, ChangeEvent, use } from 'react';
import { useUsers } from '../hooks/useUsers';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  TextField
} from '@mui/material';
import styled from 'styled-components';
import { useMasters } from '../hooks/useMasters';
import { Master } from '../types';

interface IUser {
  id: string;
  email: string;
  name: string;
  role?: 'user' | 'admin' | 'master';
  phone?: string;
}
 
interface IMasters {
  id: string;
  email: string;
  name: string;
  specialization: string;
  phone: string;
}

const UserCont = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export default function UserManagement() {
  const { users, loading, updateUserRole } = useUsers();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {masters, fetchMasters, handlePhoneChange} = useMasters();
  const [masterPhone, setMasterPhone] = useState('+7 (000) 00-00-00')

  const phoneChange = async (masterId: string, phone: string) =>{
    try{
      setMasterPhone(masterId);
      await handlePhoneChange(masterId, phone)

    } finally{
      setMasterPhone('222')
    }
    
  }

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

  if (loading) {
    return (
      <UserCont>
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      </UserCont>
    );
  }

  return (
    <UserCont>
      <Typography variant="h6" gutterBottom>
        Управление пользователями
      </Typography>

      <TextField 
        label="Поиск пользователей" 
        variant="outlined" 
        fullWidth 
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Телефон</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
               
                <TableCell>
                  {updatingUserId === user.id ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'user' | 'admin' | 'master')}
                      size="small"
                    >
                      <MenuItem value="user">Пользователь</MenuItem>
                      <MenuItem value="admin">Администратор</MenuItem>
                      <MenuItem value="master">Мастер</MenuItem>
                    </Select>
                  )}
                </TableCell>
                {user.role === 'master' && (
                  <TableCell>
                    
                    <TextField
                    size='small'
                    label = 'Номер телефона'
                    
                    value={masterPhone}
                    onChange={(e)=> phoneChange(user.id, e.target.value)}
                    />
                  </TableCell>
                  )            
                  }
              </TableRow>
            ))}

            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography align="center">Пользователи не найдены</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </UserCont>
  );
}
