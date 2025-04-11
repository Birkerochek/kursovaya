import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { styled } from '@mui/system';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Select,
  MenuItem,
  CircularProgress,
  Typography
} from '@mui/material';

const StyledPaper = styled(Paper)({
  margin: '20px 0',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const LoadingWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
});

export default function UserManagement() {
  const { users, loading, updateUserRole } = useUsers();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      setUpdatingUserId(userId);
      await updateUserRole(userId, newRole);
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (loading) {
    return (
      <StyledPaper>
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Управление пользователями
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Роль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {updatingUserId === user.id ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as 'user' | 'admin')}
                      size="small"
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
}