import React from 'react';
import { Alert, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { selectErr, selectToken } from './features/auth/authSlice';
import { checkEmail, checkPassword, clearToProceed } from './features/validation/validationSlice';

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
})

function App() {
  const token = useAppSelector(selectToken)
  const err = useAppSelector(selectErr)
  const disableSubmission = !useAppSelector(clearToProceed)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    dispatch({
      type: "AUTH_REQUEST_SIGN_IN",
      payload: {
        email: formData.get("email"),
        password: formData.get("password")
      }
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{
        minHeight: "100vh",
        width: "30vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
      }}>
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOpenIcon />
        </Avatar>

        <Typography variant="h5">
          Sign in
          {token}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2
        }}>
          <TextField
            name="email"
            type="text"
            label="Email address"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(checkEmail(e.target.value))
            }}
          />

          <TextField
            name="password"
            type="password"
            label="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(checkPassword(e.target.value))
            }}
          />

          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={disableSubmission}
          >
            Sign in
          </Button>

          {
            err &&
            <Alert severity="error">{err}</Alert>
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
