// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

import {useState} from "react";

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project imports
import Service from './Service';
import Setting from './Setting';
import Comfirmation from './Comfirmation';
import AnimateButton from 'ui-component/extended/AnimateButton';
import OrderService from "services/oder.service";
import useAuth from "hooks/useAuth";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux'
import {REQUEST, REQUEST_SUCCESS, SET_ACTION_TYPE, SET_AMOUNT} from "store/actions";
import {useNavigate} from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

// step options
const steps = ['Service', 'Setting', 'Confirmation'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Service />;
        case 1:
            return <Setting/>;
        case 2:
            return <Comfirmation />;
        default:
            throw new Error('Unknown step');
    }
}


const SamplePage = () => {
    const {token} = useAuth();
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const orderState= useSelector(state => state.order);
    const {action_type, url, amount, amount_disabled, isLoading} = orderState;
    const [result, setResult] = useState('');
    const navigate = useNavigate();


    const handleNext = async () => {
        if (action_type === "" || url === "")
            return;

        if (activeStep === 0) {

            dispatch({
                type: REQUEST,
                payload: {
                    request: true
                }
            })

            await OrderService.service_availables(token, orderState.action_type, url)
                .then((response) => {
                    dispatch({
                        type: REQUEST_SUCCESS,
                        payload: {
                            request: false
                        }
                    })
                    dispatch({
                        type: SET_AMOUNT,
                        payload: {
                            amount: response.available_amount
                        }
                    })
                });
        }


        if (activeStep === 2) {

            dispatch({
                type: REQUEST,
                payload: {
                    request: true
                }
            })

            await OrderService.new_order(token, action_type, url, amount).then((response) => {
                setResult(response.message);
            })

            await OrderService.user_info(token)
                .then((response) => {

                    dispatch({
                        type: REQUEST_SUCCESS,
                        payload: {
                            request: false
                        }
                    })

                    let user = JSON.parse(localStorage.getItem('user'));
                    user.affiliate = response.data;
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate('/');
                    window.location.reload();
                })
        }

        setActiveStep(activeStep + 1);

    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
        if (activeStep === 1){
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
                        amount: 0,
                        isLoading: false,
                        amount_disabled: false,
                    },
                }
            });
        }

    };


    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Please wait...'
        >
            <MainCard title="New Order">
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                {result}
                            </Typography>
                            <Stack direction="row" justifyContent="flex-end">
                                <AnimateButton>
                                    <Button variant="contained" color="error" onClick={() => setActiveStep(0)} sx={{ my: 3, ml: 1 }}>
                                        Reset
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </>
                    ) : (
                        <>
                            {getStepContent(activeStep)}
                            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button disabled={(action_type === "" || url === "") || amount_disabled} variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </>
                    )}
                </>
            </MainCard>
        </LoadingOverlay>
    );
}

export default SamplePage;
