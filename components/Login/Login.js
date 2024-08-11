"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "@/plugins/axios";

export default function Login() {
  const router = useRouter();
  const initForm = {
    username: "",
    password: "",
  };
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/auth/login`, form)
      .then((res) => {
        console.log(res);
        setForm(initForm);
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.data.tokens.accessToken)
        );
        router.push("/admin");
        toast.success("Login Successful");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Invalid Credentials");
      });
    console.log(form);
  };

  return (
    <>
      <div className="w-[350px] rounded overflow-hidden shadow-lg px-8 py-6 bg-green-600">
        <p className="text-center text-xl font-bold mb-3 text-white">
          Admin Panel
        </p>
        <form
          className="flex flex-col gap-4"
          method="post"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <label htmlFor="identifier" value="username" />
            </div>
            <input
              className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-2 focus:border-orange-300"
              id="username"
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
              value={form.identifier}
              style={{ border: error ? "1px solid red" : "" }}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="password" value="Password" />
            </div>
            <input
              className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-2 focus:border-orange-300"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              style={{ border: error ? "1px solid red" : "" }}
              required
            />
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded border-2 border-amber-400 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
