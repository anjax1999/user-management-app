import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers } from '../redux/usersSlice';
import { User } from '../types/user';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { RootState } from '../redux/store';

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);

  const [nameFilter, setNameFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user: User) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        user.username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
        user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
        user.phone.toLowerCase().includes(phoneFilter.toLowerCase())
      )
    );
  }, [users, nameFilter, usernameFilter, emailFilter, phoneFilter]);

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Nagłówek */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#3f51b5',
            fontWeight: 'bold',
          }}
        >
          User Management
        </Typography>
      </Box>

      {/* Pola wyszukiwania */}
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          marginBottom: '20px',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',  // Siatka 1 kolumnowa na bardzo małych ekranach
            sm: 'repeat(2, 1fr)',  // Siatka 2 kolumnowa na małych ekranach
            md: 'repeat(2, 1fr)',  // Siatka 2 kolumnowa na średnich ekranach
            lg: 'repeat(4, 1fr)',  // 4 kolumny na szerokich ekranach
          },
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{ minWidth: '200px', border: '1px solid #3f51b5' }}
        />
        <TextField
          label="Search by Username"
          variant="outlined"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
          sx={{ minWidth: '200px', border: '1px solid #3f51b5' }}
        />
        <TextField
          label="Search by Email"
          variant="outlined"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          sx={{ minWidth: '200px', border: '1px solid #3f51b5' }}
        />
        <TextField
          label="Search by Phone"
          variant="outlined"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
          sx={{ minWidth: '200px', border: '1px solid #3f51b5' }}
        />
      </Box>

      {/* Tabela z użytkownikami */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #3f51b5', textAlign: 'center' }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #3f51b5', textAlign: 'center' }}>
                Username
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #3f51b5', textAlign: 'center' }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #3f51b5', textAlign: 'center' }}>
                Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell sx={{ border: '1px solid #3f51b5' }}>{user.name}</TableCell>
                <TableCell sx={{ border: '1px solid #3f51b5' }}>{user.username}</TableCell>
                <TableCell sx={{ border: '1px solid #3f51b5' }}>{user.email}</TableCell>
                <TableCell sx={{ border: '1px solid #3f51b5' }}>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;

export {};
