import { Box, Container, CssBaseline, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '../../store/hooks';


interface IListPropertiesAmenitiesProps{
  onClickNext : ()=>void
  }

const ListPropertiesNameAmenities = ({onClickNext} : IListPropertiesAmenitiesProps) => {
  const dispatch = useAppDispatch();
  const [hotelName, setHotelName] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
    <Box display="flex" flexDirection="column" gap={2}>
        <Typography component="h4" variant="h6" fontWeight={400}>
          Enter the name of your hotel:
        </Typography>

    <TextField
          required
          variant="standard"
          id="outlined-required"
          label="Required"
          value={hotelName}
          onChange={(e)=>setHotelName(e.target.value)}
        />
<Typography component="h4" variant="h6" fontWeight={400}>
          Enter the name of your hotel:
        </Typography>

    <TextField
          required
          variant="standard"
          id="outlined-required"
          label="Required"
          value={hotelName}
          onChange={(e)=>setHotelName(e.target.value)}
        />



        </Box>
          
          </Box>
      </Container>

  )
}

export default ListPropertiesNameAmenities
