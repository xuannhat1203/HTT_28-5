import { useState, useEffect } from "react";

interface Infor {
  id: number;
  name: string;
  lorem: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
}

interface ListProductProps {
  sendData: (data: Infor[]) => void;
}

export default function ListProduct({ sendData }: ListProductProps) {
  const listProduct2: Infor[] = [
    {
      id: 1,
      name: "Pizza",
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 30,
      quantity: 1,
      stock: 30,
      image: "./src/Components/Image/pizza.jpg",
    },
    {
      id: 2,
      name: "Hamburger",
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 15,
      quantity: 1,
      stock: 15,
      image: "./src/Components/Image/Hamburger.jpg",
    },
    {
      id: 3,
      name: "Bread",
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 20,
      quantity: 1,
      stock: 20,
      image: "./src/Components/Image/bread.jpg",
    },
    {
      id: 4,
      name: "Cake",
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!",
      price: 10,
      quantity: 1,
      stock: 10,
      image: "./src/Components/Image/Cake.jpg",
    },
  ];
  localStorage.setItem("listProduct",JSON.stringify(listProduct2))
  const [products, setProducts] = useState<Infor[]>(JSON.parse(localStorage.getItem("listProduct") || "[]"));
  const [cart, setCart] = useState<Infor[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    if (items.length > 0) {
      setCart(items);
    }
  }, []);

  useEffect(() => {
    sendData(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, sendData]);

  const handleQuantity = (id: number, newQuantity: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, quantity: newQuantity }
        : product
    );
    setProducts(updatedProducts);
  };
  
  const handleClick = (id: number) => {
    const selectedProduct = products.find((product) => product.id === id);
    if (selectedProduct) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + selectedProduct.quantity,
                  stock: item.stock + selectedProduct.stock,
                }
              : item
          );
        } else {
          return [...prevCart, selectedProduct];
        }
      });
    }
  };

  return (
    <>
      {products.map((product: Infor) => (
        <div key={product.id}>
          <div className="media product">
            <div className="media-left">
              <a href="#">
                <img
                  className="media-object"
                  src={product.image}
                  alt={product.name}
                />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{product.name}</h4>
              <p>{product.lorem}</p>
              <input
                style={{
                  width: "75px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                name={`quantity-${product.name.toLowerCase()}`}
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => handleQuantity(product.id, +e.target.value)}
              />
              <a
                style={{
                  width: "75px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="price"
                onClick={() => handleClick(product.id)}
              >
                {product.stock}
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
