// material-ui
import { Grid, TextField, Typography } from '@mui/material';
import {useSelector} from 'react-redux'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {CHANGE_AMOUNT, SET_AMOUNT_DISABLED} from "../../store/actions";


let temp_amount = 0;

// ==============================|| FORM WIZARD - BASIC  ||============================== //
export default function Setting() {

    const orderState = useSelector(state => state.order);
    const {amount, name, type} = orderState;
    const dispatch = useDispatch();
    const [amount_val, setAmountVal] = useState(0);

    useEffect(() => {
        setAmountVal(amount);
        temp_amount = amount;
    }, []);

    const handleChange = (event, val, key) => {

        if (key === 'amount'){
            const input_amount = event.target.value;
            setAmountVal(input_amount);
            if (input_amount > temp_amount || input_amount < 10){
                dispatch({
                    type: CHANGE_AMOUNT,
                    payload: {
                        amountt: input_amount
                    }
                })

                dispatch({
                    type: SET_AMOUNT_DISABLED,
                    payload: {
                        amount_disabled: true
                    }
                })
            }else {
                dispatch({
                    type: SET_AMOUNT_DISABLED,
                    payload: {
                        amount_disabled: false
                    }
                });

                dispatch({
                    type: CHANGE_AMOUNT,
                    payload: {
                        amountt: input_amount
                    }
                })
            }
        }
    }


    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Order configuration
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#000' }}>
                {name}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 0, color: '#615c5c' }}>
                        Red Social
                    </Typography>
                    <TextField required id="cardName" value="instagram" disabled={true} fullWidth autoComplete="cc-name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 0, color: '#615c5c' }}>
                        Type of service
                    </Typography>
                    <TextField required id="cardNumber" value={type} disabled={true} fullWidth autoComplete="cc-number" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 0, color: '#615c5c' }}>
                        Quantity to send
                    </Typography>
                    <TextField required id="amount" placeholder="1000" disabled={false} fullWidth autoComplete="" value={amount_val} onChange={(event, val) => handleChange(event, val, 'amount')} />
                </Grid>
            </Grid>
        </>
    );
}
