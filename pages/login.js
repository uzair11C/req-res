import React, {useContext} from 'react'
import { Container, Paper, Typography, Button, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useRouter} from 'next/router'
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers } from '../actions/actions'
import { AllUsers } from '../contexts/allUsersContext'
import { CurrentUser } from '../contexts/currentUserContext'
import Link from 'next/link'

const Login = () => 
{
    const error =''
    const {value1, value2} = useContext(AllUsers)

    const [currentUser, setCurrentUser] = useContext(CurrentUser)

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
                submitHandler()
            }
        }
    )

    const submitHandler = () =>
    {
        usersdata1.map((user1)=>{ 
            if(user1.email === formik.values.email) 
            {
                setCurrentUser({...user1, email: user1.email, first_name:user1.first_name,last_name:user1.last_name,avatar:user1.avatar})
                router.push('/user')
            }
            })

        usersdata2.map((user2)=>{
            if(user2.email=== formik.values.email)
            {
                setCurrentUser({...user2, email: user2.email, first_name:user2.first_name,last_name:user2.last_name,avatar:user2.avatar})
                router.push('/user')
            }
            else
            {
                error='Values did not match'
                console.log('Values do not match')
            }
        })
    }

    console.log(formik.values)

  return (
            <Container maxWidth='lg' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                <Paper sx={{width:'400px',height:'500px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',backgroundColor:'#878dfa'}}>
                    <Typography variant='h2' component='div' sx={{textAlign:'left',mb:'10px'}}>
                        Login
                    </Typography>
                    <Typography variant='p' component='p' sx={{color:'red'}}>
                        {error}
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
                            <Typography>
                                Don&#39;t have an account? <Link href='/sign-up'><Button variant='contained' color='success'>Sign-Up!</Button></Link>
                            </Typography>
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