"use client";
import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import ProductItem from "./productItem";
import Logo from "../../public/image/foslogo.jpg";
import Profile from "../../public/image/albi.jpg";
import { removeCookies, getCookies } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/types";
import { BASE_IMAGE_PROFILE } from "@/global";
import productItem from "../adminTemplate/productItem";

type ProductType = {
  id: string;
  icon: ReactNode;
  path: string;
  label: string;
};

type UserProp = {
  children: ReactNode;
  id: string;
  user: IUser | null;
  title: string;
  productList: ProductType[];
};

const Sidebar = ({ children, id, title, productList, user }: UserProp) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const name = getCookies("name");
    if (name) {
      setUserName(name);
    }
  }, []);
  const router = useRouter();
  // const router = useRouter();

  // useEffect(() => {
  //   const name = getCookies("name"); // Ambil nama pengguna dari cookie
  //   if (name) {
  //     setUserName(name); // Setel nama pengguna ke state
  //   }
  // }, []);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleLogout = () => {
    removeCookies("token");
    removeCookies("id");
    removeCookies("name");
    removeCookies("role");
    removeCookies("cart");
    router.replace(`/login`);
  };

  return (
    <div className="w-full min-h-dvh  bg-white">
      {/* header section */}
      <header className="flex justify-between items-center p-4 bg-red-telkom shadow-md ai-style-change-1 sticky top-0 z-10">
        <div className="relative flex gap-2">
          <button
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}
            className="flex items-center space-x-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-white hover:text-red-400" //garis tiga pojokan dashboard
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m16.5 4.5h16.5"
              />
            </svg>
          </button>
          <h1 className="font-bold text-xl text-white]">{title}</h1>
          <button>
            {" "}
            {setIsShow && (
              <div
                className=""
                onMouseEnter={() => setIsShow(true)}
                onMouseLeave={() => setIsShow(false)}
              >
                <div
                  className={`flex flex-col w-2/4 md:w-1/3 lg:w-1/6 h-full fixed top-0 right-full transition-all duration-300 case-in-out z-50 bg-red-telkom border-r border-red-telkom shadow-[5px_0px_15px_rgba(0,0,0,0.1)] rounded-r-3xl ${
                    isShow ? `translate-x-full` : ``
                  }`}
                >
                  {/* close button */}
                  <div className="ml-auto p-2 "></div>
                  {/* end close button */}
                  {/* logo section */}
                  <div className="mb-3 w-full flex justify-center">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={Logo}
                        alt="Logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <h1 className="text-2xl font-bold text-white">Eco Market</h1>
                    </div>
                  </div>
                  {/* end logo section */}
                  {/* user section */}
                  <div
                    className="w-full mt-5 mb-3 bg-primary text-white p-5 flex gap-2 items-center" //akun
                  >
                    <Image
                      src={`${BASE_IMAGE_PROFILE}/${user?.profile_picture}`}
                      alt="Profile"
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                    .<div className="text-md font-semibold">{userName}</div>
                  </div>
                  {/* end user section */}
                  {/* product section */}
                  <div className="w-full p-2 overflow-y-auto">
                    <div className="px-5">
                      {productList.map((product, index) => (
                        <ProductItem
                          icon={product.icon}
                          label={product.label}
                          path={product.path}
                          active={product.id === id}
                          key={`keyProduct${index}`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* product section */}
                </div>
              </div>
            )}
          </button>
        </div>

        <div className="relative">
          <button
            onMouseEnter={() => setIsDropdownOpen(true)} // tampilkan dropdown saat hover
            onMouseLeave={() => setIsDropdownOpen(false)} // sembunyikan dropdown saat mouse meninggalkan button
            className="flex items-center space-x-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>

            <button className="font-bold">Logout</button>
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-0 w-56 bg-teal-200 rounded-md shadow-lg py-1 z-10 top-full opacity-0 translate-y-2 transition-all duration-300 ease-out" //kotak drobox
              onMouseEnter={() => setIsDropdownOpen(true)} // pastikan dropdown tetap terbuka saat mouse berada di dalam dropdown
              onMouseLeave={() => setIsDropdownOpen(false)} // sembunyikan dropdown saat mouse keluar dari dropdown
              style={{
                opacity: isDropdownOpen ? 1 : 0,
                transform: isDropdownOpen
                  ? "translateY(0)"
                  : "translateY(10px)",
              }}
            >
              <a
                href="#"
                className="block px-4 py-2 text-md font-semibold text-teal-800 hover:bg-teal-300"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-md font-semibold text-teal-800 hover:bg-teal-300"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-md font-semibold text-teal-800 hover:bg-teal-300"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>
      {/* end header section */}
      {/* content section */}
      <div className="p-4">{children}</div>
      {/* end content section */}
      {/* sidebar section */}

      {/* end sidebar section */}
    </div>
  );
};
export default Sidebar;
