import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';

const Login = () => {
  const user = "";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log("Submitted Data:", data);
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-white px-4">
      
      {/* Card Container */}
      <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 py-16">
        
        {/* Login Form */}
        <form 
          onSubmit={handleSubmit(submitHandler)} 
          className="form-container w-full lg:w-[450px] bg-white/5 backdrop-blur-md p-10 rounded-3xl shadow-[0_0_50px_#ff00ff25] hover:shadow-[0_0_80px_#ff00ff50] hover:scale-[1.03] transition-transform duration-1000 ease-in-out flex flex-col gap-y-8"

        >
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-fuchsia-400">Welcome Back!</h2>
            <p className="text-base text-gray-400 mt-1">Enter your credentials to launch 🚀</p>
          </div>

          <Textbox
            placeholder="you@example.com"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded-full"
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email ? errors.email.message : ""}
          />

          <Textbox
            placeholder="••••••••"
            type="password"
            name="password"
            label="Password"
            className="w-full rounded-full"
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password.message : ""}
          />

          <div className="text-right">
            <span className="text-sm text-gray-400 hover:text-fuchsia-500 hover:underline cursor-pointer transition-all">
              Forgot Password?
            </span>
          </div>

          <Button
            type="submit"
            label="Login"
            className="w-full h-11 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:shadow-[0_0_25px_#ff00ff80] hover:scale-105 transition-all font-semibold"
          />
        </form>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-6 max-w-xl">
          <span className="px-4 py-3 mb-[-10px] bg-gradient-to-r from-purple-700/20 via-fuchsia-700/20 to-pink-600/20 text-fuchsia-200 rounded-full text-sm shadow-sm border border-fuchsia-500/10 backdrop-blur-sm">
            Manage your projects effortlessly 🚀
          </span>
          <p className='flex flex-col gap-2 text-4xl md:text-6xl 2xl:text-7xl font-extrabold text-center leading-tight'>
  <span className=' h-full text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 pb-2'>
    ProjectForge
  </span>
  <span className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-orange-500  to-rose-500 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(255,119,255,0.3)] tracking-wide">
  "Your Command Center"
</span>

</p>


          <div className="cell">
            <div className="circle rotate-in-up-left"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
