import React from 'react'
import { Container, Paper, Typography, Button } from '@mui/material'
import Link from 'next/link'

const UnLoggedInHome = () => 
{
    return (
        <Container maxWidth='xl' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'80vh'}}>
            <Paper sx={{width:'650px',height:'300px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',backgroundColor:'#878dfa'}}>
                <Typography variant='h3' component='h3'>
                    You must login to to view the content on this website.
                </Typography>
                <Button variant='contained'>
                    <Link href='/login'>
                        <a>
                            Login
                        </a>
                    </Link>
                </Button>
            </Paper>
        </Container>
    )
}

export default UnLoggedInHome