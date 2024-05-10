"use client"
import {TextField, Typography, Box, Button, Stack, OutlinedInput, InputAdornment, IconButton, InputLabel} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useState, MouseEvent} from "react";
import FormControl from "@mui/material/FormControl";


export default function SchoolSettings() {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });


  const handleClickShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Stack padding={2}>
      <Typography variant="h5" fontWeight="bold" marginBottom={4}>
        Setting
      </Typography>

      <Typography variant="h6" fontWeight="bold" marginBottom={2}>
        Reset Password
      </Typography>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        rowGap: 4
      }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Old Password</InputLabel>

          <OutlinedInput
            label="Old Password"
            type={showPassword.oldPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword('oldPassword')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword.oldPassword ? <VisibilityOffIcon /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
           />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>New Password</InputLabel>

          <OutlinedInput
            label="New Password"
            type={showPassword.newPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword('newPassword')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword.newPassword ? <VisibilityOffIcon /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel>Confirm Password</InputLabel>

          <OutlinedInput
            label="Confirm Password"
            type={showPassword.confirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword('confirmPassword')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword.confirmPassword ? <VisibilityOffIcon /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "600px",
        marginTop: 4
      }}>
        <Button variant="outlined" sx={{
          borderRadius: 8
        }}>Cancel</Button>
        <Button variant="contained" sx={{
          borderRadius: 8
        }}>Submit</Button>
      </Box>
    </Stack>
  )
}