import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/InputErrorMessage";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useState } from "react";

interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  // ----------------- States -----------------
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  // ----------------- Handlers -----------------
  // !Send User Login Info to check and allow to enter if authenticated
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      if (status == 200) {
        toast.success(
          "You will navigate to the login page after 4 seconds to login!.",
          {
            position: "top-right",
            duration: 4000,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );

        localStorage.setItem("loggedInUser", JSON.stringify(resData));

        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const errorMsg = errorObj.response?.data.error.message;

      toast.error(`${errorMsg}`, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- Renders -----------------
  // ! Make the login input fields dinamically
  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, indx) => {
      return (
        <div key={indx}>
          <Input
            placeholder={placeholder}
            type={type}
            {...register(name, validation)}
          />
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      );
    }
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}

        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
