"use client";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookie";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";



const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/login`;
      const payload = JSON.stringify({ email: email, password });
      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (data.status == true) {
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "success",
          autoClose: 2000,
        });
        storeCookie("token", data.token);
        storeCookie("id", data.data.id);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);
        let role = data.data.role;
        if (role === `ADMIN`)
          setTimeout(() => router.replace(`/admin/dashboard`), 1000);
        else if (role === `USER`)
          setTimeout(() => router.replace(`/user/dashboard`), 1000);
      } else
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "warning",
        });
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        hideProgressBar: true,
        containerId: `toastLogin`,
        type: "error",
      });
    }
  };
  return (
    <div className="w-screen h-screen bg-login bg-cover">
      <ToastContainer containerId={`toastLogin`} />
      <div className="w-full h-full bg-backdrop-login flex justify-center items-center p-5">
        <div className="w-full md:w-6/12 lg:w-4/12 min-h-[600px] border rounded-xl bg-white p-5 flex flex-col items-center relative">
          <div className="absolute bottom-0 left-0 w-full py-2 text-center">
            <small className="text-red-telkom">Copyright @2024</small>
          </div>
          <Image
            alt="moklet-app"
            width={150}
            height={100}
            src={`/image/foslogo.jpg`}
            className="h-auto my-10 rounded-md "
          />
          <h4 className="text-2xl uppercase font-semibold mb-4 text-black">
            Eco Market
          </h4>
          <span className="text-sm text-slate-800 font-medium text-center">
           Ready Semua Jenis Barang
          </span>

          <form onSubmit={handleSubmit} className="w-full my-10">
            <div className="flex w-full my-4">
              <div className="bg-red-telkom rounded-l-md p-3 border border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="border p-2 grow rounded-r-md focus:outline-none focus:ring-primary focus:border-primary border-gray-500 text-red-text "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                id={`email`}
              />
            </div>

            <div className="flex w-full my-4 border rounded-md border-gray-500">
              <div className="bg-red-telkom rounded-l-md p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <input
                type={showPassword ? `text` : `password`}
                className="border p-2 grow focus:outline-none focus:ring-primary focus:border-primary border-gray-500 text-red-text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                id={`password-industri-app`}
              />
              <div
                className="cursor-pointer bg-red-telkom rounded-r-md p-3 border border-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="my-10">
              <button
                type="submit"
                className="bg-red-800 hover:bg-primary uppercase w-full p-2 rounded-md text-bold text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
