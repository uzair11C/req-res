import React, {useContext} from 'react'
import { Container, Paper, Typography, Button, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useRouter} from 'next/router'
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers } from '../actions/actions'
import { AllUsers } from '../contexts/allUsersContext'

const Login = () => 
{
    const {value1, value2} = useContext(AllUsers)

    const [users1, setUsers1] = value1
    const [users2, setUsers2] = value2

    // const fetchUsers = useSelector((state) => state.fetchUsers)
    // const dispatch = useDispatch();

    // const users2 = dispatch(fetchUsers)
    //console.log(allUsers)

    const usersdata1 = users1
    const usersdata2 = users2

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
                console.log(formik.errors)
            }
        }
    )

    // usersdata.map((user)=>{ if(user.email === formik.values.email) 
    //     {
        
    //         router.push('/user')
    //         //return user
    //     }
    //         else{
    //             console.log('Names do not match')
    //         }
    //     })

    const submitHandler = () =>
    {

    }

    
    console.log(formik.values)
    console.log(usersdata1.map(user=>(user.first_name)))

  return (
            <Container maxWidth='lg' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                <Paper sx={{width:'400px',height:'500px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',backgroundColor:'#878dfa'}}>
                    <Typography variant='h2' component='div' sx={{textAlign:'left',mb:'10px'}}>
                        Login
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
                            <Button type='submit' variant='contained' sx={{mt:'10px'}}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
  )
}

export default Login

// export const getStaticProps = async () =>
// {

//     const res = await fetch('https://reqres.in/api/users?page=1')
//     const users = await res.json()

//     return{
//         props:{
//             users
//         }
//     }
// }