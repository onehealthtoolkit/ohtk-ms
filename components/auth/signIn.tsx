import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "lib/store";

type FormValue = {
  username: string;
  password: string;
};

const validation = {
  username: {
    required: "กรุณากรอกอีเมล",
  },
  password: {
    required: "กรุณากรอกรหัสผ่าน",
  },
};

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const store = useStore();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit = (data: FormValue) => {
    console.log("submit");
    clearErrors();
    setIsSubmitting(true);
    store
      .signIn(data.username, data.password)
      .catch(e => {
        console.error(e);
        setError("username", {
          message: e.message,
        });
      })
      .finally(() => {
        setIsSubmitting(true);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white flex h-screen">
        <div className="bg-white m-auto">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              {...register("username", validation.username)}
              type="text"
              placeholder="Username"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-700 text-xs italic">
                {errors.username?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="password"
              {...register("password", validation.password)}
              type="password"
              placeholder="*********"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-700 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isSubmitting}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
