import { useState, ChangeEvent } from 'react';
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
  TextField,
} from '@mui/material';
import styled from 'styled-components';
import { useMasters } from '../hooks/useMasters';

const UserCont = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 8px rgba(0,0,0,0.3);
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const CreateMasterCont = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap:wrap;
  margin-bottom: 50px;

`

const SubmitButton = styled.div`
background: #2573D8;
color: #fff;
height: 40px;
width:150px;
font-size: 14px;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
transition: .3s;

&:hover{
  background: #0B5C7E;
}
`
export default function UserManagement() {
  const { users, loading, updateUserRole } = useUsers();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading: mastersLoading, createMaster } = useMasters();

  const [newMaster, setNewMaster] = useState({
    name: '',
    email: '',
    specialization: '',
    phone: '',
  });
  const [creating, setCreating] = useState(false);

  const handleNewMasterChange = (field: keyof typeof newMaster) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewMaster(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleAddMaster = async () => {
    try {
      setCreating(true);
      await createMaster(newMaster);
      setNewMaster({ name: '', email: '', specialization: '', phone: '' });
      alert('Мастер добавлен')
    } catch {
   
    } finally {
      setCreating(false);
    }
  };

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
        <Typography variant="h6">
        Добавить нового мастера
      </Typography>
      <CreateMasterCont>
        <TextField
          label="Имя"
          value={newMaster.name}
          onChange={handleNewMasterChange('name')}
          size="small"
        />
        <TextField
          label="Email"
          value={newMaster.email}
          onChange={handleNewMasterChange('email')}
          size="small"
        />
        <TextField
          label="Специализация"
          value={newMaster.specialization}
          onChange={handleNewMasterChange('specialization')}
          size="small"
        />
        <TextField
          label="Телефон"
          value={newMaster.phone}
          onChange={handleNewMasterChange('phone')}
          size="small"
        />
        <SubmitButton
          onClick={handleAddMaster}
        >
          {creating ? 'Добавление…' : 'Добавить мастера'}
        </SubmitButton>
      </CreateMasterCont>
      <Typography variant="h6" >
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
