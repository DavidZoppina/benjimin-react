// material-ui
import { Grid, Typography, TextField, Autocomplete, FormHelperText } from '@mui/material';
import {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import OrderService from "../../services/oder.service";
import useAuth from "../../hooks/useAuth";
import {SET_ACTION_TYPE, SET_URL} from "store/actions";

// ==============================|| FORM WIZARD - BASIC  ||============================== //
export default function Service() {

    const {token} = useAuth();
    const dispatch = useDispatch();
    const [services, setServices] = useState([]);
    const [action_type, setActionType] = useState('');
    const [url, setUrl] = useState('https://www.instagram.com/p/ChQmiQ0Lcog/');
    // const orderState= useSelector(state => state.order);
    // const {isLoading} = orderState;
    const [description, setDescription] = useState("");

    const handleChange = (event, value) => {
        if (value != null){
            setActionType(value.action_type);
            setDescription(value.description);
            dispatch({
                type: SET_ACTION_TYPE,
                payload: {
                    service: value,
                }
            });
        }else {
            setDescription("");
            setActionType("");
            dispatch({
                type: SET_ACTION_TYPE,
                payload: {
                    service: {
                        name: '',
                        description: '',
                        action_id: '',
                        action_type: '',
                        type: '',
                        url: '',
                        amount: 0
                    },
                }
            });
        }
    }

    const handleChangeUrl = (event, value, key) => {
        setUrl(event.target.value);
        dispatch({
            type: SET_URL,
            payload: {
                url: event.target.value
            }
        });
    }

    useEffect(() => {
          function fetchData() {
              OrderService.services(token).then((response) => {
                 if (response.services.length > 0) {
                     response.services.map((item) => {
                         item.label = item.name;
                         item.id = item.action_id;
                         return item;
                     });
                     setServices(response.services);
                 }
             })
         }
        fetchData();
    },[token]);

    return (
        <>
            <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
                Marketing Service
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mb: 2, color: '#615c5c' }}>
                Select the marketing service you want.
            </Typography>


            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                        Service
                </Grid>

                <Grid item xs={12} sm={6}>
                        Destination url
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        disablePortal
                        options={services}
                        onChange={handleChange}
                        renderInput={(params) =>
                            <TextField {...params} label="" />}
                    />

                    {!action_type && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            Service is required
                        </FormHelperText>
                    )}

                    {description && (
                        <FormHelperText>
                            {description}
                        </FormHelperText>
                    )}
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required id="lastNameBasic" name="lastName" onChange={(event, val) => handleChangeUrl(event, val, 'lastName')}
                               value={url} label="" fullWidth autoComplete="family-name" />
                    {!url && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                            Destination url is required
                        </FormHelperText>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
