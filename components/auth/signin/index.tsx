import React, { useState } from "react";
import useStore from "lib/store";
import { observer } from "mobx-react";
import { SignInViewModel } from "./viewModel";

const SignIn = () => {
  const store = useStore();
  const [viewModel] = useState(new SignInViewModel(store));

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <form
      onSubmit={evt => {
        viewModel.signIn();
        evt.preventDefault();
      }}
    >
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
              type="text"
              placeholder="Username"
              onChange={evt => (viewModel.username = evt.target.value)}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-700 text-xs italic">{errors.username}</p>
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
              type="password"
              placeholder="*********"
              onChange={evt => (viewModel.password = evt.target.value)}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-700 text-xs italic">{errors.password}</p>
            )}
          </div>
          {viewModel.submitError.length > 0 && (
            <div>{viewModel.submitError}</div>
          )}
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

export default observer(SignIn);
