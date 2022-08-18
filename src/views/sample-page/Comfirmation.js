import { Fragment } from 'react';

// material-ui
import { Typography } from '@mui/material';


export default function Comfirmation() {
    return (
        <>
            <Typography variant="h2" gutterBottom textAlign={"center"} sx={{ mb: 2, color: '#615c5c' }}>
                All ready!
            </Typography>

            <Typography variant="h3" gutterBottom textAlign={"center"} sx={{ mb: 2, color: '#615c5c' }}>
                Confirm the order to begin processing.
            </Typography>

            <Typography variant="h4" gutterBottom textAlign={"center"} sx={{ mb: 2, color: '#615c5c' }}>
                This action can not be undone
            </Typography>
        </>
    );
}
