import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Button,Stack} from'@mui/material'
import { CurrentUser } from '../contexts/currentUserContext'
import {useRouter} from 'next/router'
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


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

function ChildModal({ name, email, password }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{mt:'10px'}} variant='contained' color='secondary' onClick={handleOpen}>PATCH!</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, padding:'10px', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
        <Typography id="transition-modal-title" variant="h3" component="h2">
            PATCH!
        </Typography>
        <Typography varaint='h5' component='p' id="transition-modal-description" sx={{ mt: 2 }}>
            {name}
        </Typography>
        <Typography varaint='h5' component='p' id="transition-modal-description" sx={{ mt: 2 }}>
            {email}
        </Typography>
        <Typography varaint='h5' component='p' id="transition-modal-description" sx={{ mt: 2 }}>
            {password}
        </Typography>
          <Button variant='contained' color='success' onClick={handleClose}>OK!</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Appbar = () => {

  const [currentUser, setCurrentUser] = React.useContext(CurrentUser)

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const router = useRouter()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const LogOut = () =>
  {
    setCurrentUser({
      email: '',
      first_name: '',
      last_name: '',
      avatar: ''
      })
      router.push('/')
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik(
    {
        initialValues:{
            name:'',
            email:'',
            password:''
        },
        validationSchema: Yup.object(
            {
                name: Yup.string(),
                email: Yup.string().email('Invalid Email'),
                password: Yup.string()
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
      const res = await axios.patch(`https://reqres.in/api/users/${currentUser.id}`,
                              {
                                  name:   formik.values.name,
                                  email: formik.values.email,
                                  password: formik.values.password
                              }            
                      )
      res.data.headeres['Content-Type']
      console.log(res)
  }

  const deleteProf = async () =>
  {
      const res = await axios.delete(`https://reqres.in/api/users/${currentUser.id}`)
      console.log(res)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{display:'flex'}}>
          <Box sx={{ display:'flex', justifyContent:'flex-start',flexGrow:1 }}>
            <Typography
            variant="h4"
            noWrap
            component="h4"
            sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            Req-Res
            </Typography>
          </Box>

          { 
            currentUser !== {}
            ?
            <Box sx={{ display:'flex', justifyContent:'flex-end',flexGrow:1 }}>
              
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser.first_name} src={currentUser.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Button varaint='contained' color='error' onClick={LogOut}>Logout</Button>  
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Button varaint='contained' color='secondary' onClick={handleOpen}>Update Profile</Button>  
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{ ...style, width: 400 }}>
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
                                <ChildModal name={formik.values.name} email={formik.values.email} password={formik.values.password} />
                            </Stack>
                        </form>
                      </Box>
                    </Modal>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Button varaint='outlined' color='error' onClick={handleOpen}>Delete Profile</Button>  
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{ ...style, width: 400 }}>
                        <Typography variant='h3' component='h2' sx={{color:'red'}}>
                          Are you sure???
                        </Typography>
                        <Button varaint='Contained' onClick={()=>{deleteProf(); handleOpen(); }} color='error'>Yes I&#39;m sure</Button>
                        <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{ ...style, width: 400 }}>
                        <Typography variant='h3' component='h2'>
                          Deleted
                        </Typography>
                      </Box>
                    </Modal>
                      </Box>
                    </Modal>
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
          :
          <></>  
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Appbar;