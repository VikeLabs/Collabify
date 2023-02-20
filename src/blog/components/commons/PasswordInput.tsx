import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@material-ui/core';

interface PropType {
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
}

export function PasswordInput({ onInput, password }: PropType) {
  const [showPass, setShowPass] = useState<boolean>(false);
  const onToggle = () => setShowPass((s) => !s);

  return (
    <TextField
      label='password'
      variant='outlined'
      type={showPass ? 'text' : 'password'}
      value={password}
      onChange={onInput}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <PasswordVisible
              isVisible={showPass}
              onToggle={onToggle}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

interface PasswordVisibleProps {
  isVisible: boolean;
  onToggle: () => void;
}

function PasswordVisible({ isVisible, onToggle }: PasswordVisibleProps) {
  return (
    <Box
      role='button'
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      {isVisible ? <VisibilityOff /> : <Visibility />}
    </Box>
  );
}
