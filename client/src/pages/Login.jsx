import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';

const Login = () => {
  const user = "";
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log("submit", data);
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-white'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>

        {/* Left Side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:mt-20'>
            <span className='flex gap-1 py-1 px-3 border border-fuchsia-500/30 bg-fuchsia-500/10 rounded-full text-sm md:text-base text-fuchsia-300'>
            Manage your projects effortlessly 🚀
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-transparent bg-clip-text'>
              <span>ProjectForge</span>
              <span>Your Command Center</span>
            </p>
            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col items-center justify-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white/5 backdrop-blur-md px-10 pt-14 pb-14 rounded-3xl shadow-[0_0_40px_#ff00ff20] border border-white/10'
          >
            <div>
              <p className='text-fuchsia-400 text-3xl font-bold text-center'>Welcome back!</p>
              <p className='text-center text-base text-gray-400'>Enter your credentials to continue.</p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email' 
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='Enter your password'
                type='password' 
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className='text-sm text-gray-400 hover:text-fuchsia-500 hover:underline cursor-pointer transition-all'>
                Forget password?
              </span>

              <Button
                type="submit" 
                label="Login" 
                className='w-full h-10 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:shadow-[0_0_20px_#ff00ff60] hover:scale-105 transition-all'
              />
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
