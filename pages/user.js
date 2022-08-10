import React, {useContext} from 'react'
import { CurrentUser } from '../contexts/currentUserContext'
import Appbar from '../components/Appbar'
import {Container, Paper, Stack, Typography} from '@mui/material';
import {useRouter} from 'next/router'
import ResourceTable from '../components/ResourceTable';
// import UserTabs from '../components/UserTabs';

const User = () => 
{
    const [currentUser, setCurrentUser] = useContext(CurrentUser)
    console.log(currentUser)

    const router = useRouter()

    if(currentUser === {})
    {
        router.push('/')
    }

    return(
        <>
            <Appbar />
            <Container maxWidth='lg' sx={{display:'flex',justifyContent:'center',mt:'20px'}}>
                <Stack direction='column' spacing={3} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <Typography variant='h4' component='div'>
                        Hello, {currentUser.first_name} {currentUser.last_name}
                    </Typography>
                    {/* <UserTabs /> */}
                    <Paper elevation={6} sx={{width:'800px',height:'400px', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ResourceTable />
                    </Paper>
                </Stack>
            </Container>
        </>
    )
}

export default User