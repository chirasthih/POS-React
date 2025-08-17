import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getItems = async () => {
      try {
        const itemData = await ApiService.getAllItems();

        if (itemData.status === 200) {
          setTotalPages(Math.ceil(itemData.items.length / itemsPerPage));

          setItems(
            itemData.items.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting Items: " + error
        );
      }
    };

    getItems();
  }, [currentPage]);

 
  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this Item?")) {
      try {
        await ApiService.deleteItem(itemId);
        showMessage("Item sucessfully Deleted");
        window.location.reload(); 
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Error Deleting in a item: " + error
        );
      }
    }
  };

  
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="item-page">
        <div className="item-header">
          <h1>Items</h1>
          <button
            className="add-item-btn"
            onClick={() => navigate("/add-item")}
          >
            Add Item
          </button>
        </div>

        {items && (
          <div className="item-list">
            {items.map((item) => (
              <div key={item.id} className="product-item">
                <img
                  className="item-image"
                  src={item.imageUrl}
                  alt={item.name}
                />

                <div className="item-info">
                    <h3 className="name">{item.name}</h3>
                    <p className="sku">Sku: {item.su}</p>
                    <p className="price">Price: {item.price}</p>
                    <p className="quantity">Quantity: {item.stockQuantity}</p>
                </div>

                <div className="item-actions">
                    <button className="edit-btn" onClick={()=> navigate(`/edit-item/${item.id}`)}>Edit</button>
                    <button  className="delete-btn" onClick={()=> handleDeleteItem(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      />
    </Layout>
  );
};
export default ItemPage;
