import { useState, useEffect } from "react";
import swal from "sweetalert";

interface Infor {
  id: number;
  name: string;
  lorem: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
}

export default function Cart({ listProducts }: { listProducts: Infor[] }) {
  const [total, setTotal] = useState<number>(0);
  const [listItem, setListItem] = useState<Infor[]>(listProducts);
  const [updateQuantity, setUpdateQuantity] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    setListItem(listProducts);
    const initialQuantities = listProducts.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {} as { [key: number]: number });
    setUpdateQuantity(initialQuantities);
  }, [listProducts]);

  useEffect(() => {
    const totalstock = listItem.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setTotal(totalstock);
    localStorage.setItem("cart", JSON.stringify(listItem));
  }, [listItem]);

  const handleDelete = (id: number) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedListItem = listItem.filter((item) => item.id !== id);
        setListItem(updatedListItem);
        swal("Poof! Your item has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your item is safe!");
      }
    });
  };
  const handleChange = (id: number, newQuantity: number) => {
    const product = listItem.find((item) => item.id === id);
    if (product && newQuantity > product.stock) {
      swal("Vượt quá số lượng sản phẩm trong kho");
    } else {
      setUpdateQuantity((prev) => ({ ...prev, [id]: newQuantity }));
    }
  };

  const handleUpdate = (id: number) => {
    const updatedListItem = listItem.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: updateQuantity[id],
          }
        : item
    );
    setListItem(updatedListItem);
  };

  return (
    <div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h1 className="panel-title">Your Cart</h1>
          </div>
          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="my-cart-body">
                {listItem.map((product, index) => (
                  <tr key={product.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.price} USD</td>
                    <td>
                      <input
                        name={`cart-item-quantity-${index}`}
                        type="number"
                        value={updateQuantity[product.id]}
                        onChange={(e) =>
                          handleChange(product.id, +e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <a
                        className="label label-info update-cart-item"
                        data-product={product.id}
                        onClick={() => handleUpdate(product.id)}
                      >
                        Update
                      </a>
                      <a
                        className="label label-danger delete-cart-item"
                        data-product={product.id}
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot id="my-cart-footer">
                <tr>
                  <td colSpan={4}>
                    There are <b>{listItem.length}</b> items in your shopping
                    cart.
                  </td>
                  <td colSpan={2} className="total-price text-left">
                    {total} USD
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="alert alert-success" role="alert" id="mnotification">
          Add to cart successfully
        </div>
      </div>
    </div>
  );
}
