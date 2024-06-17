import React, { useState } from 'react'
import banner from "../../assets/loginPage/login-banner.jpg"
import { Header } from '../../Components/Header/Header'


const InputTag = ({ type, placeholder, value, onChange }) => {

    return (
        <>
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} required className='w-2/3 z-10 px-6 py-2 rounded-sm bg-black border' />
        </>
    )

}

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [name, setNme] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(name, email, password);


        setNme("")
        setEmail("")
        setPassword("")
    }

    const handleLogin = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <>
            <Header />
            <div onSubmit={handleSubmitForm} className='w-full h-screen flex justify-center items-center' style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9)' }}>
                <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
                <div className='absolute inset-0 bg-black opacity-50'></div>

                <form className='w-1/3 relative min-h-[300px] z-10 flex flex-col justify-center items-center gap-6 py-6 text-white rounded-md'>

                    <div className='absolute inset-0 bg-black opacity-50 z-0'></div>

                    {
                        isLogin ? <h1 className='w-2/3 flex justify-start z-10 font-semibold text-2xl'>SinUp</h1>
                            : <h1 className='w-2/3 flex justify-start z-10 font-semibold text-2xl'>Sign In</h1>
                    }

                    {isLogin ? <InputTag type='text' value={name} onChange={(e) => setNme(e.target.value)} placeholder='Enter your FullName' /> : ''}

                    <InputTag type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />
                    <InputTag type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />

                    {
                        isLogin ? <button type='submit' className='w-2/3 z-10 px-6 py-2 rounded-sm bg-[#E50914]'>SinUp</button>
                            : <button type='submit' className='w-2/3 z-10 px-6 py-2 rounded-sm bg-[#E50914]'>Sign In</button>
                    }

                    <p className='w-2/3 z-10'><span>{isLogin ? "Already have an account?" : "New to Netflix?"}</span><span onClick={handleLogin} className='cursor-pointer text-[#E50914] ml-1'>{isLogin ? "Sign Up Now" : "Login"}</span></p>

                </form>
            </div>
        </>
    )
}

