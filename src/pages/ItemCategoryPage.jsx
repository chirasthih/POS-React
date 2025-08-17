import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const ItemCategoryPage = () => {
  const [itemcategories, setitemcategories] = useState([]);
  const [itemcategoryName, setitemcategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemCategoryId, setEditingItemCategoryId] = useState(null);

  

  useEffect(() => {
    const getItemCategories = async () => {
      try {
        const response = await ApiService.getAllitemCategory();
        if (response.status === 200) {
          setitemcategories(response.itemcategories);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Loggin in a User: " + error
        );
      }
    };
    getItemCategories();
  }, []);

 
  const additemcategory = async () => {
    if (!itemcategoryName) {
      showMessage("Item Category name cannot be empty");
      return;
    }
    try {
      await ApiService.createItemCategory({ name: itemcategoryName });
      showMessage("Category sucessfully added");
      setItemCategoryName(""); 
      window.location.reload(); 
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Loggin in a User: " + error
      );
    }
  };

  
  const editItemCategory = async () => {
    try {
      await ApiService.updateItemCategory(editItemCategoryId, {
        name: itemcategoryName,
      });
      showMessage("Item Category sucessfully Updated");
      setIsEditing(false);
      setitemcategoryName(""); 
      window.location.reload(); 
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Loggin in a User: " + error
      );
    }
  };

  
  const handleEdititemCategory = (itemcategory) => {
    setIsEditing(true);
    setEditingitemCategoryId(itemcategory.id);
    setitemCategoryName(itemcategory.name);
  };

  
  const handleDeleteItemCategory = async (itemcategoryId) => {
    if (window.confirm("Are you sure you want to delete this item category?")) {
      try {
        await ApiService.deleteItemCategory(categoryId);
        showMessage("Item Category sucessfully Deleted");
        window.location.reload(); 
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Deleting in a item Category: " + error
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
      <div className="item category-page">
        <div className="item category-header">
          <h1>Item Categories</h1>
          <div className="add-cat">
            <input
              value={itemcategoryName}
              type="text"
              placeholder=" Item Category Name"
              onChange={(e) => setItemCategoryName(e.target.value)}
            />

            {!isEditing ? (
              <button onClick={additemcategory}>Add Item Category</button>
            ) : (
              <button onClick={edititemcategory}>Edit Item Cateogry</button>
            )}
          </div>
        </div>

        {itemcategories && (
          <ul className="Item category-list">
            {itemcategories.map((category) => (
              <li className="category-item" key={category.id}>
                <span>{category.name}</span>

                <div className="itemcategory-actions">
                  <button onClick={() => handleEdititemCategory(itemcategory)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteitemcategory(itemcategory.id)}>
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default ItemCategoryPage;
