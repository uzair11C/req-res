import React, {useContext} from 'react'
import { Container, Paper, Typography, Button, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useRouter} from 'next/router'
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers } from '../actions/actions'
import { AllUsers } from '../contexts/allUsersContext'
import { CurrentUser } from '../contexts/currentUserContext'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex:99
  };

const SignUp = () => 
{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const router = useRouter()

    const formik = useFormik(
        {
            initialValues:{
                name:'',
                email:'',
                password:''
            },
            validationSchema: Yup.object(
                {
                    name: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid Email').required('Required'),
                    password: Yup.string().required('Required')
                }
            ),
            onSubmit: (values) =>
            {
                console.log(values)
                submitHandler()
            }
        }
    )

    const submitHandler = async () =>
    {
        handleOpen()
        const res = await axios.post('https://reqres.in/api/register',
                                {
                                    name:   formik.values.name,
                                    email: formik.values.email,
                                    password: formik.values.password
                                }            
                        )
        console.log(res)
    }

    console.log(formik.values)

  return (
            <Container maxWidth='lg' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                <Paper sx={{width:'400px',height:'500px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',backgroundColor:'#878dfa'}}>
                    <Typography variant='h2' component='div' sx={{textAlign:'left',mb:'10px'}}>
                        Sign Up
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={3} >
                            <div>
                                <label htmlFor='name'>
                                    <Typography variant='h4'>
                                        Name:
                                    </Typography>
                                </label>
                                <input onBlur={formik.handleBlur} type='text' id='name' name='name' placeholder='Name' value={formik.values.name} onChange={formik.handleChange}/>
                                {formik.touched.name && formik.errors.name?<Typography variant='subtitle' component='p'>{formik.errors.name}</Typography>:null}
                            </div>
                            
                            <div>
                                <label htmlFor='email'>
                                    <Typography variant='h4'>
                                        Email
                                    </Typography>
                                </label>
                                <input onBlur={formik.handleBlur} type='email' id='email' name='email' placeholder='Email' value={formik.values.email} onChange={formik.handleChange}/>
                                {formik.touched.email && formik.errors.email?<Typography variant='subtitle' component='p'>{formik.errors.email}</Typography>:null}
                            </div>

                            <div>
                                <label htmlFor='password'>
                                    <Typography variant='h4'>
                                        Password:
                                    </Typography>
                                </label>
                                <input onBlur={formik.handleBlur} type='password' id='password' name='password' placeholder='Password' value={formik.values.password} onChange={formik.handleChange}/>
                                {formik.touched.password && formik.errors.password?<Typography variant='subtitle' component='p'>{formik.errors.password}</Typography>:null}
                            </div>
                            <Button type='submit' variant='contained' sx={{mt:'10px'}} onSubmit={formik.handleSubmit}>
                                Submit
                            </Button>
                            <div>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                    timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                    <Box sx={style}>
                                        <Typography id="transition-modal-title" variant="h3" component="h2">
                                            POST!
                                        </Typography>
                                        <Typography varaint='h5' component='p' id="transition-modal-description" sx={{ mt: 2 }}>
                                            {formik.values.name}
                                        </Typography>
                                        <Typography varaint='h5' component='p' id="transition-modal-description" sx={{ mt: 2 }}>
                                            {formik.values.email}
                                        </Typography>
                                        <Typography varaint='h5' component='p' id="transition-modal-description" sx={{ mt: 2 }}>
                                            {formik.values.password}
                                        </Typography>
                                    </Box>
                                    </Fade>
                                </Modal>
                                </div>
                        </Stack>
                    </form>
                </Paper>
            </Container>
  )
}

export default SignUp