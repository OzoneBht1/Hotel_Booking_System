import React from "react";
import { useAppDispatch } from "../store/hooks";
import { verifyLogin } from "../store/api";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      verifyLogin({
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      })
    );
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="Enter email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          placeholder="Enter password"
          required
        />
      </div>
      <div>
        <label />
        <button className="primary" type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
