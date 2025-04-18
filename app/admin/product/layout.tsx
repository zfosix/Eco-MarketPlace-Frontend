import ManagerTemplate from "@/components/adminTemplate";
import MenuList from "../productList";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "Product | Eco Market",
  description: "Generated by create next app",
};
type PropsLayout = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: PropsLayout) => {
  return (
    <ManagerTemplate title="product" id="product" productList={MenuList}>
      {children}
      <ToastContainer containerId={`toastMenu`} />
    </ManagerTemplate>
  );
};
export default RootLayout;
