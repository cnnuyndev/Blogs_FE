import React from 'react'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { SignIn } from '@/services/apiBlog'
import { toast } from 'react-toastify'
import SmallSpinner from '@/ui_components/SmalSpinner'

const LoginPage = ({setIsAuthenticated}) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const location = useLocation()
  const navigate = useNavigate()
  
  const mutation  = useMutation({
    mutationFn:  (data) => SignIn(data),
    onSuccess:(response)=>{
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
      setIsAuthenticated(true)
      toast.success("You have succesfully signin");
      const from = location?.state?.from?.pathname || "/"
      navigate(from, {replace:true})
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });


  const onSubmit=(data)=>{
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 
    items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl 
    dark:text-white dark:bg-[#141624]"
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">Signin Form</h3>
        <p>Welcome back! Log in to continue.</p>
      </div>

      <div>
        <Label htmlFor="username" className="dark:text-[97989F]">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          disabled={mutation.isPending}
          placeholder="Enter username"
          {...register("username", { required: "Username is required" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
          <InputError error={errors.username.message} />
        )}
      </div> 

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          disabled={mutation.isPending}
          placeholder="Enter password"
          {...register("password", { required: "Password is required" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px]  w-[300px]"
        />
        {errors?.password?.message && (
          <InputError error={errors.password.message} />
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button disabled={mutation.isPending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
          {mutation.isPending ? (
            <>
              {" "}
              <SmallSpinner /> {" Logining In ..."} 
              {/* <SmallSpinnerText text="Logging in..." /> */}
            </>
          ) : (
            <>
              SignIn
            </>
            // <SmallSpinnerText text="Signin" />
          )}
        </button>
        <p className="text-[14px]">
          Don't have an account? <Link to="/signup">signup</Link>
        </p>
      </div>
    </form>
  );
}

export default LoginPage