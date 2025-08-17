import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const AddEdititemPage = () => {
  const { itemId } = useParams("");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStokeQuantity] = useState("");
  const [itemcategoryId, setItemCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [itemcategories, setItemCategories] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const ItemcategoriesData = await ApiService.getAllItemCategory();
        setItemCategories(itemcategoriesData.itemcategories);
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Error Getting all Item Categories: " + error
        );
      }
    };

    const fetchItemById = async () => {
      if (itemId) {
        setIsEditing(true);
        try {
          const itemData = await ApiService.getItemById(itemId);
          if (itemData.status === 200) {
            setName(itemData.item.name);
            setSku(itemData.item.sku);
            setPrice(itemData.item.price);
            setStokeQuantity(itemData.item.stockQuantity);
            setItemCategoryId(itemData.item.setItemCategory);
            setDescription(itemData.item.description);
            setImageUrl(itemData.item.imageUrl);
          } else {
            showMessage(itemData.message);
          }
        } catch (error) {
          showMessage(
            error.response?.data?.message ||
              "Error Getting a Item by Id: " + error
          );
        }
      }
    };

    fetchItemCategories();
    if (itemId) fetchItemById();
  }, [itemId]);

  //method to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result); //user imagurl to preview the image to upload
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    formData.append("itemcategoryId", itemcategoryId);
    formData.append("description", description);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      if (isEditing) {
        formData.append("itemId", itemId);
        await ApiService.updateitem(formData);
        showMessage("Item successfully updated");
      } else {
        await ApiService.addProduct(formData);
        showMessage("Item successfully Saved 🤩");
      }
      navigate("/item");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Saving a Item: " + error
      );
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="item-form-page">
        <h1>{isEditing ? "Edit Item" : "Add Item"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Sku</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStokeQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Item Category</label>

            <select
              value={itemcategoryId}
              onChange={(e) => setItemCategoryId(e.target.value)}
              required
            >
              <option value="">Select a Item category</option>

              {itemcategories.map((category) => (
                <option key={itemcategory.id} value={itemcategory.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Item Image</label>
            <input type="file" onChange={handleImageChange} />

            {imageUrl && (
              <img src={imageUrl} alt="preview" className="image-preview" />
            )}
          </div>
          <button type="submit">{isEditing ? "Edit Item" : "Add Item"}</button>

        </form>
      </div>
    </Layout>
  );
};

export default AddEdititemPage;
