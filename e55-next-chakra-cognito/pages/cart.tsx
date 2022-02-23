import { NextPage } from "next";
import Navbar from "../components/common/Navbar";

interface Props {}

const Cart: NextPage = (props) => {
  return (
    <>
      <Navbar />
      <p>Thanks for buying</p>
    </>
  );
};

export default Cart;
