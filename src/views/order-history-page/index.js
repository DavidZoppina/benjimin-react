// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// ==============================|| SAMPLE PAGE ||============================== //
// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography,
        Box,
        Collapse,
        IconButton,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        Grid,
        TableHead,
        TableRow,
        TablePagination,
        Link
} from '@mui/material';
import Chip from 'ui-component/extended/Chip';
// project imports

import SubCard from 'ui-component/cards/SubCard';
// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useAuth from "../../hooks/useAuth";
import OrderService from "../../services/oder.service";
import Utils from 'utils/utils'

function Row({ order }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    instagram
                </TableCell>
                <TableCell align="right">{order.type}</TableCell>
                <TableCell align="right">{order.values.amount}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                    {Utils.timeAgo(order.createdAt)}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                margin: 1
                            }}
                        >
                            <TableContainer>
                                <SubCard
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                    title="Order details"
                                    content={false}
                                >
                                <Grid container spacing={3} sx={{pl: 2, pt: 1}}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="h6">Sent <Chip label={order.values.sent} variant="outlined" size="small" chipcolor="success" /></Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1">
                                                                    UUID : &nbsp;
                                                                    <Typography component="span" variant="body2">
                                                                        {order._id}
                                                                    </Typography>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="h6">Failed <Chip label={order.values.failed} variant="outlined" size="small" chipcolor="success" /></Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1">
                                                                    Type : &nbsp;
                                                                    <Typography component="span" variant="body2">
                                                                        {order.type}
                                                                    </Typography>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1">
                                                                    Url : &nbsp;
                                                                    <Typography component="span" variant="body2">
                                                                        <Link href={order.url} target="_blank" underline="hover">
                                                                             {order.url}
                                                                        </Link>
                                                                    </Typography>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="h6">Amount <Chip label={order.values.amount} variant="outlined" size="small" chipcolor="success" /></Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1">
                                                                    Status : &nbsp;
                                                                    <Typography component="span" variant="body2">
                                                                        {order.status}
                                                                    </Typography>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1">
                                                                    Date : &nbsp;
                                                                    <Typography component="span" variant="body2">
                                                                        {Utils.timeAgo(order.createdAt)}
                                                                    </Typography>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                </SubCard>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};


const OderHistoryPage = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [dense] = useState(false);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        OrderService.order_history(token).then((response) => {
            setOrders(response.orders);
        })}, [token]);

    return (
        <div>
            {/*<MainCard title="Order History">*/}
            {/*    <Typography variant="body2">*/}
            {/*        Hello world ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna*/}
            {/*        alissa. Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal.*/}
            {/*        aube grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate*/}
            {/*        president, sunk in culpa qui officiate descent molls anim id est labours.*/}
            {/*    </Typography>*/}
            {/*</MainCard>*/}
            <MainCard content={false} title="Orders History" sx={{ mt: 5 }}>
                {/* table */}
                <TableContainer>
                    <Table aria-label="collapsible table" size={dense ? 'small' : 'medium'}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }} />
                                <TableCell>Red</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">State</TableCell>
                                <TableCell sx={{ pr: 3 }} align="right">
                                    Creation
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {orders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((order) => (
                                <Row key={order._id} order={order} />
                            ))}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table data */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </div>
    );
};

export default OderHistoryPage;
