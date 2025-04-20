import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({ loading, style }) {

    return (
        loading &&
        <Box sx={style}>
            <Fade
                in={loading}
            >
                <CircularProgress />
            </Fade>
        </Box>
    );
}
