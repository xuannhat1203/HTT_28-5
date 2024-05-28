import { useState, useEffect } from "react";
import Cart from "./Components/Cart";
import ListProduct from "./Components/ListProduct";

interface Infor {
  id: number;
  name: string;
  lorem: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
}

export default function App() {
  const [cart, setCart] = useState<Infor[]>([]);
  const getDataFromListProduct = (data: Infor[]) => {
    setCart(data);
  };

  useEffect(() => {
    console.log(cart, 12313231);
  }, [cart]);

  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h1 className="panel-title">List Products</h1>
                </div>
                <div className="panel-body" id="list-product">
                  <ListProduct sendData={getDataFromListProduct} />
                </div>
              </div>
            </div>
          </div>
          <Cart listProducts={cart} />
        </div>
      </div>
    </div>
  );
}
