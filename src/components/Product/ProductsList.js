import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductsList = () => {
  const navigate = useNavigate();
  const [product, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      navigate("/products");
    }
    const userId = JSON.parse(userData)._id;
   
    const response = await fetch(`http://localhost:2000/products/${userId}`, {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const result = await response.json();
    setProducts(result.products);
    console.log(result);
  };
  console.log(product);

  const onProductDeleteHandler = (id) => {
  
    const deleteProduct = async () => {
      const response = await fetch(`http://localhost:2000/delete/${id}`, {
        method: "delete",
      });
      const result = await response.json();
      if(result.succe)
      getProducts();
    };
    deleteProduct();
  };
  const onSearchHandler = (e) => {
    const key = e.target.value;
    console.log(key);
    const userId = localStorage.getItem("user");
    const id = JSON.parse(userId)._id;
    console.log(id);
    if (key) {
      const search = async () => {
        const response = await fetch(
          `http://localhost:2000/search/${key}/${id}`
        );
        const result = await response.json();
        console.log(result);
        setProducts(result);
      };
      search();
    } else {
      getProducts();
    }
  };
  if (product === undefined) {
    return <p>No Product Found</p>;
  }
  return (
    <div className="products">
      <h1> Product List</h1>
      <input
        type="text"
        placeholder="Search"
        className="search"
        onChange={onSearchHandler}
      />
      {product.length === 0 ? (
        <h1>Product Not Faund</h1>
      ) : (
        <div className="product-container">
          {product.map((item) => {
            return (
              <ul className="list productList">
                <li> Name : {item.name}</li>
                <li>Category : {item.category}</li>
                <li>Description : {item.description}</li>
                <li>Price : {item.price} Rs</li>
                <button
                  className="delete"
                  onClick={() => {
                    onProductDeleteHandler(item._id);
                  }}
                >
                  Delete
                </button>
                <Link className="update" to={`/update-product/${item._id}`}>
                  Update
                </Link>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
