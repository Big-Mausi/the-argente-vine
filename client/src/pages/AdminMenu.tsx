import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItems,
  updateMenuItem,
  type CreateMenuItem,
} from "../services/api";
import type { MenuCategory, MenuItem } from "../types/menu";

const emptyForm: CreateMenuItem = {
  name: "",
  description: "",
  price: 0,
  image: "",
  alt: "",
  category: "Starters",
};

const AdminMenu = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [formData, setFormData] = useState<CreateMenuItem>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error("Error loading menu:", error);
        setError("Unable to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => {
      if (name === "price") {
        return {
          ...previous,
          price: Number(value),
        };
      }

      if (name === "category") {
        return {
          ...previous,
          category: value as MenuCategory,
        };
      }

      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId !== null) {
        const updatedItem = await updateMenuItem(editingId, formData);

        setMenuItems((previous) =>
          previous.map((item) => (item.id === editingId ? updatedItem : item)),
        );

        setSuccess("Menu item updated successfully.");
      } else {
        const newItem = await createMenuItem(formData);

        setMenuItems((previous) => [...previous, newItem]);

        setSuccess("Menu item created successfully.");
      }

      resetForm();
    } catch (error) {
      console.error("Error saving menu item:", error);
      setError("Unable to save menu item.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);

    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      alt: item.alt,
      category: item.category,
    });

    setSuccess("");
    setError("");
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu item?",
    );

    if (!confirmed) return;

    try {
      await deleteMenuItem(id);

      setMenuItems((previous) => previous.filter((item) => item.id !== id));

      setSuccess("Menu item deleted successfully.");
    } catch (error) {
      console.error("Error deleting menu item:", error);
      setError("Unable to delete menu item.");
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-1">Menu Management</h1>

            <p className="text-muted mb-0">Add, edit, and remove menu items.</p>

            <button
              type="button"
              className="btn btn-outline-dark mt-3"
              onClick={() => navigate("/admin/dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {success && <div className="alert alert-success">{success}</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          {/* Menu Form */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">
                  {editingId !== null ? "Edit Menu Item" : "Add Menu Item"}
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Price + Category */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>

                      <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>

                      <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="Starters">Starters</option>

                        <option value="Main Course">Main Course</option>

                        <option value="Desserts">Desserts</option>

                        <option value="Drinks">Drinks</option>
                      </select>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mb-3 mt-3">
                    <label htmlFor="image" className="form-label">
                      Image URL
                    </label>

                    <input
                      type="text"
                      id="image"
                      name="image"
                      className="form-control"
                      value={formData.image}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Alt Text */}
                  <div className="mb-4">
                    <label htmlFor="alt" className="form-label">
                      Image Alt Text
                    </label>

                    <input
                      type="text"
                      id="alt"
                      name="alt"
                      className="form-control"
                      value={formData.alt}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <button
                    type="submit"
                    className="btn btn-warning me-2"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId !== null
                        ? "Update Menu Item"
                        : "Add Menu Item"}
                  </button>

                  {editingId !== null && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={resetForm}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Menu List */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Current Menu</h2>

                {loading ? (
                  <p className="text-muted">Loading menu items...</p>
                ) : menuItems.length === 0 ? (
                  <p className="text-muted">No menu items found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {menuItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <strong>{item.name}</strong>
                            </td>

                            <td>{item.category}</td>

                            <td>₦{item.price.toLocaleString()}</td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-dark me-2"
                                onClick={() => handleEdit(item)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminMenu;
