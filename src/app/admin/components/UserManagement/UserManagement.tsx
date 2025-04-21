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
import { useUsers } from '../../hooks/useUsers';
import { CreateMasterCont, LoadingWrapper, SubmitButton, UserCont } from '../StyledComponents';
import useAddMaster from './hooks/useAddMaster';
import useUsersSearch from './hooks/useUsersSearch';
import { use, useEffect } from 'react';


export default function UserManagement() {
  const { loading } = useUsers();
  const { handleAddMaster, creating, newMaster, handleNewMasterChange } = useAddMaster();
  const { handleSearchChange, filteredUsers, searchQuery, updatingUserId, handleRoleChange } = useUsersSearch();
 

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
