import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_PRODUCT, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/Alert";
import AddUser from "./addUser";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Search from "./search";
import EditUser from "../user/editUser";
import DeleteUser from "./deleteUser";
const getUser = async (search: string): Promise<IUser[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/user?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IUser[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UserPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search ? searchParams.search.toString() : ``;
  const product: IUser[] = await getUser(search);
  const category = (cat: string): React.ReactNode => {
    if (cat === "ADMIN") {
      return (
        <span className="bg-blue-100] text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-telkom-hover dark:text-blue300">
          ADMIN
        </span>
      );
    }
    if (cat === "USER") {
      return (
        <span className="bg-indigo-100 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-telkom-hover dark:textindigo-300">
          USER
        </span>
      );
    }
  };

  return (
    <div>
      <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
        <h4 className="text-xl font-bold text-red-telkom-hover mb-2">
          User Data
        </h4>
        <p className="text-sm text-secondary text-red-telkom-hover mb-4">
          This page displays user data, allowing product to view details, search,
          and manage product items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          {/* searchbar */}
          <div className="flex items-center w-full max-w-md flex-grow text-red-telkom-hover">
            <Search url={`/admin/user`} search={search} />
          </div>
          {/* Add product Button */}
          <div className="ml-4">
            <AddUser />
          </div>
        </div>
        {product.length == 0 ? (
          <AlertInfo title="informasi">No data Available</AlertInfo>
        ) : (
          <>
            <div className="m-2">
              {product.map((data, index) => (
                <div
                  key={`keyPrestasi${index}`}
                  className={`flex flex-wrap shadow m-2`}
                >
                  <div className="w-full md:w-1/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Picture
                    </small>
                    <br />
                    <Image
                      width={50}
                      height={50}
                      src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`}
                      className="rounded-sm overflowhidden"
                      alt="preview"
                      unoptimized
                    />
                  </div>
                  <div className="w-full md:w-2/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Name
                    </small>{" "}
                    <br />
                    <p className="text-color-product font-bold">{data.name}</p>
                  </div>
                  <div className="w-full md:w-5/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Email
                    </small>{" "}
                    <br />
                    <p className="text-color-product font-bold">{data.email}</p>
                  </div>

                  <div className="w-full md:w-2/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Role
                    </small>{" "}
                    <br />
                    {category(data.role)}
                  </div>
                  <div className="w-full md:w-1/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Action
                    </small>
                    <br />
                    <div className="flex gap-1">
                      <EditUser selectedUser={data} />
                      <DeleteUser selectedUser={data} />

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default UserPage;
