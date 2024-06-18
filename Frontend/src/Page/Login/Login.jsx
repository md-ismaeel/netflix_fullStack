import React, { useState } from 'react'
import banner from "../../assets/loginPage/login-banner.jpg"
import { Header } from '../../Components/Header/Header'
import axios from "axios"
import { API_END_POINT } from "../../utils/endPoints"
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../Components/Footer/Footer'
import { Line } from '../../Components/Line'
import { useDispatch } from "react-redux"
import { setUser } from '../../Redux/Slices/userSlice'



const InputTag = React.memo(({ type, placeholder, value, onChange }) => {
    return (
        <>
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} required className='w-2/3 z-10 px-6 py-2 rounded-sm bg-black border' />
        </>
    )
})


export const Login = () => {

    const dispatch = useDispatch()

    const [isLogin, setIsLogin] = useState(false)

    const [fullName, setNme] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            console.log(fullName, email, password);

            const userDetails = {
                fullName, email, password
            };

            const response = await axios.post(
                `${API_END_POINT}/${!isLogin ? 'register' : 'login'}`,
                userDetails,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );

            const data = response.data;

            if (data) {
                alert(data.message);
                if (data.success) {
                    if (isLogin) {
                        navigate('/layout'); // Redirect to the layout page after login
                    } else {
                        setIsLogin(true);
                    }
                }
            }
            dispatch(setUser(data.user))

        } catch (err) {
            console.log('Something went wrong', err);
        }

        setNme("")
        setEmail("")
        setPassword("")
    }

    const handleLogin = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <>
            <div className='w-full h-screen flex flex-col justify-start items-center' style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9)' }}>
                <Header />
                <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
                <div className='absolute inset-0 bg-black opacity-50'></div>

                <form onSubmit={handleSubmitForm} className='w-1/3 relative min-h-[300px] z-20 flex flex-col justify-center items-center gap-6 py-6 text-white rounded-md'>

                    <div className='absolute inset-0 bg-black opacity-50 z-0'></div>

                    <h1 className='w-2/3 flex justify-start z-10 font-semibold text-2xl'>{!isLogin ? "Sign Up" : "Sign In"}</h1>

                    {!isLogin ? <InputTag type='text' value={fullName} onChange={(e) => setNme(e.target.value)} placeholder='Enter your FullName' /> : ''}

                    <InputTag type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />
                    <InputTag type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />

                    <button type='submit' className='w-2/3 z-10 px-6 py-2 rounded-sm bg-[#E50914] font-medium hover:bg-red-700 transition-colors'>{!isLogin ? "Sign Up" : "Sign In"}</button>

                    <p className='w-2/3 z-10'><span>{!isLogin ? "Already have an account?" : "New to Netflix?"}</span><span onClick={handleLogin} className='cursor-pointer text-[#E50914] ml-1 hover:underline'>{isLogin ? "Sign Up" : "Login"}</span></p>

                </form>
            </div>
            <Line />
            <Footer />
        </>
    )
}

