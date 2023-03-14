import React, { useEffect, useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../../Controller/Redux/authSlice'
import './login.css';
import trakabg from '../../assets/images/traka1.jpg'
import logo from '../../assets/images/traka_logo.gif'
import {toast} from 'react-toastify'
import axios from 'axios';
import { CircularLoading } from '../../components/loading/Loading';

const Login = () => {
    const LOGIN_URL = process.env.API_URL
    // const LOGIN_URL = "http://localhost:3005/api/auth/login"
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)
    const [loading, setLoading] = useState(false); 


    // const [formInput, setFormInput] = useState({
    //     firstName:"",
    //     password:""
    // })

    const [firstname, setFirstName] = useState("")
    const [password, setPassword] = useState("")

    // useEffect(()=> {
    //     if(isError) {
    //         toast.error(message)
    //     }
    //     if(isSuccess || user) {
    //         navigate('/dashboard')
    //     }

    //     dispatch(reset())
    // }, [user, isError, isSuccess, message, navigate, dispatch])

    // const inputChanged = (e) => {
    //     setFormInput({
    //         ...formInput,
    //         [e.target.name]: e.target.value
    //         // [e.target.name]: e.target.value
    //     })
    // }

    // useEffect(() => {
    //     authenticate()
    // }, [])

    // const authenticate = async() => {
    //     await axios.post(LOGIN_URL, formInput)
    //     .then(response => console.log(response.data))
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post("http://localhost:3005/api/auth/login", {firstname, password}) //Local
            //const response = await axios.post(LOGIN_URL+"/api/auth/login", {firstname, password})
            const response = await axios.post("https://traka.onrender.com/api/auth/login", {firstname, password}) //Production
            
            if(response.data){ 
                setLoading(true);
                localStorage.setItem('user', JSON.stringify(response.data));
                //navigate('/dashboard') //1. navigate to loading page for 5 secs
                setTimeout(() => {
                    navigate("/dashboard"); //2. Then navigate to dashboard
                  }, 5000);
            }
            // setLoading(false);

        } catch (error) {
            toast.error(error.response.data)
            console.log(error.response.data)
        }
        //dispatch(login(formInput))
    }

    const handleClick = () => {
        console.log("Login button Clicked!")
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 8000);
        return () => clearTimeout();
        // const timer = setTimeout(() => {
        //     console.log('This will run after 1 second!')
        //   }, 1000);
        // return () => clearTimeout(timer);
    }

    // if(isLoading) {
    //     return <>Loading...</>
    // }



  return (
    <div className='login-container'>
        {/* <h4>Login</h4> */}
        <div className="login-form-wrapper">
            <div className="login-wrapper-left">
                <div className="login-caption">
                    "...Keep track, stay on traka"
                </div>
                <div className="login-overlay-wrapper">
                    <div className="login-overlay"></div>
                    <img src={trakabg} alt="traka cover" className="login-overlay-img" />
                </div>
            </div>
            <div className="login-wrapper-right">
                <div className="login-logo-wrapper"><img src={logo} alt="traka logo" className='logo'/></div>
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>First Name</label>
                        {/* <input type="text" name='firstName' className='formInput' placeholder="Enter your first name" onChange={(e)=> setFormInput(e.target.value) } value={formInput.firstName}></input> */}
                        <input type="text" name='firstName' className='formInput' placeholder="Enter your first name" onChange={(e)=> setFirstName(e.target.value)} value={firstname}></input>
                    </p>
                    <p>
                        <label>Password</label>
                        {/* <input type="password" className='formInput' placeholder="Enter your password" onChange={(e)=> setFormInput(e.target.value) } value={formInput.password}></input> */}
                        <input type="password" className='formInput' placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)} value={password}></input>
                    </p>

                    {/* <Link className='login-link'> */}
                        <button type='submit' className='submit-button' onClick={handleClick}>Login {loading && <CircularLoading />}</button>
                        
                    {/* </Link> */}
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login