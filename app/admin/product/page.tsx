import { IProduct } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_PRODUCT } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/Alert";
import AddProduct from "./addProduct";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Search from "./search";
import EditProduct from "./editProduct";
import DeleteProduct from "./deleteProduct";

const getProduct = async (search: string): Promise<IProduct[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_API_URL}/product?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IProduct[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const ProductPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = searchParams.search ? searchParams.search.toString() : ``;
  const product: IProduct[] = await getProduct(search);

  const category = (cat: string): React.ReactNode => {
    if (cat === "FOOD") {
      return (
        <span className="bg-blue-100] text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-telkom-hover dark:text-blue300">
          Food
        </span>
      );
    }
    if (cat === "ITEMS") {
      return (
        <span className="bg-indigo-100 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-telkom-hover dark:textindigo-300">
          Snack
        </span>
      );
    }
    return (
      <span className="bg-purple-100 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-400 dark:text-purple300">
        Drink
      </span>
    );
  };

  return (
    <div>
      <div className="m-2 bg-white rounded-lg p-6 border-t-primary shadow-md">
        <h4 className="text-xl font-bold text-red-telkom-hover mb-2">
          Product Data
        </h4>
        <p className="text-sm text-secondary text-red-telkom-hover mb-4">
          This page displays product data, allowing menus to view details,
          search, and manage product items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          {/* searchbar */}
          <div className="flex items-center w-full max-w-md flex-grow text-red-telkom-hover">
            <Search url={`/admin/product`} search={search} />
          </div>
          {/* Add Menu Button */}
          <div className="ml-4">
            <AddProduct />
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
                      src={`${BASE_IMAGE_PRODUCT}/${data.picture}`}
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
                    <p className="text-color-product font-bold text-rose-500">
                      {data.name}
                    </p>
                  </div>
                  <div className="w-full md:w-1/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Price
                    </small>{" "}
                    <br />
                    <p className="text-color-product font-bold text-rose-500">
                      {data.price}
                    </p>
                  </div>
                  <div className="w-full md:w-5/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Description
                    </small>{" "}
                    <br />
                    <p className="text-color-product font-bold text-rose-500">
                      {data.description}
                    </p>
                  </div>
                  <div className="w-full md:w-1/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Category
                    </small>{" "}
                    <br />
                    {category(data.category)}
                  </div>
                  <div className="w-full md:w-2/12 p-2">
                    <small className="text-sm font-bold text-red-telkom-hover">
                      Action
                    </small>
                    <br />
                    <div className="flex gap-1">
                      <EditProduct selectedProduct={data} />
                      <DeleteProduct selectedProduct={data} />
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
export default ProductPage;
