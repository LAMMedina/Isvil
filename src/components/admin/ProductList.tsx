import React, { useState, useEffect, useCallback, useRef } from "react";
import Spinner from '@admin/Spinner';
import ConfirmationModal from '@admin/ConfirmationModal';


interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  category_name: string;
  image_url?: string;
  image?: File | null;
}

// Objeto de caché global
const cache = {
  products: [] as Product[],
  categories: [] as Category[],
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: /* undefined as number | undefined */0, // descomentar y quitar el 0 para que funcione
    stock: /* undefined as number | undefined */0, // descomentar y quitar el 0 para que funcione
    category_id: undefined as number | undefined,
    image: undefined as File | undefined,
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
    productName: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchProducts = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && cache.products.length > 0) {
      setProducts(cache.products);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      cache.products = data;
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && cache.categories.length > 0) {
      setCategories(cache.categories);
      return;
    }

    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
      cache.categories = data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to fetch categories. Please try again.');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);
    const formData = new FormData();

    if (!newProduct.name || !newProduct.description || newProduct.price === undefined || newProduct.stock === undefined || newProduct.category_id === undefined) {
      alert('Por favor, completa todos los campos requeridos.');
      setIsProcessing(false);
      return;
    }

    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price.toString());
    formData.append('stock', newProduct.stock.toString());
    formData.append('category_id', newProduct.category_id.toString());
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }
      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      cache.products = [...cache.products, createdProduct];
      setNewProduct({
        name: "",
        description: "",
        price: undefined,
        stock: undefined,
        category_id: undefined,
        image: undefined,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert(`Error creating product: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleEdit(product: Product) {
    setEditProduct(product);
    setIsModalOpen(true);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);
    if (editProduct) {
      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('description', editProduct.description);
      formData.append('price', editProduct.price.toString());
      formData.append('stock', editProduct.stock.toString());
      formData.append('category_id', editProduct.category_id.toString());
      if (editProduct.image) {
        formData.append('image', editProduct.image);
      }

      try {
        const response = await fetch(`/api/products/${editProduct.id}`, {
          method: "PUT",
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update product');
        }
        const updatedProduct = await response.json();
        const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        setProducts(updatedProducts);
        cache.products = updatedProducts;
        setEditProduct(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating product:', error);
        alert(`Error updating product: ${error.message}`);
      } finally {
        setIsProcessing(false);
      }
    }
  }

  function handleDeleteConfirmation(product: Product) {
    setProductToDelete(product);
    setIsConfirmationOpen(true);
  }

  async function handleDelete() {
    if (!productToDelete) return;

    setIsProcessing(true);
    setIsConfirmationOpen(false);

    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      const updatedProducts = products.filter(p => p.id !== productToDelete.id);
      setProducts(updatedProducts);
      cache.products = updatedProducts;
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Error deleting product: ${error.message}`);
    } finally {
      setIsProcessing(false);
      setProductToDelete(null);
    }
  }

  function handleFilterChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  const filteredProducts = products.filter((product) => {
    return (
      (filters.category === "" ||
        product.category_id.toString() === filters.category) &&
      (filters.minPrice === "" ||
        product.price >= parseFloat(filters.minPrice)) &&
      (filters.maxPrice === "" ||
        product.price <= parseFloat(filters.maxPrice)) &&
      (filters.minStock === "" ||
        product.stock >= parseInt(filters.minStock)) &&
      (filters.maxStock === "" || product.stock <= parseInt(filters.maxStock)) &&
      (filters.productName === "" ||
        product.name.toLowerCase().includes(filters.productName.toLowerCase()))
    );
  });

  async function handleOpenModal(imageUrl: string) {
    setIsProductModalOpen(true);
    const modalImage = document.createElement('img');
    modalImage.src = imageUrl;
    modalImage.alt = 'Product Image';
    modalImage.className = 'w-96 h-auto';

    const modalContainer = document.createElement('div');
    modalContainer.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75';

    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white p-4 rounded-lg shadow-lg';
    modalContent.appendChild(modalImage);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.className = 'mt-4 bg-red-500 text-white px-4 py-2 rounded';
    closeButton.onclick = () => {
      setIsProductModalOpen(false);
      modalContainer.remove();
    };

    modalContent.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
  }

  return (
    <div>
      {isLoading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                placeholder="Product name"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mt-2">
                Description
              </label>
              <textarea
                id="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                placeholder="Product description"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mt-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={newProduct.price || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                placeholder="Price"
                step="0.01"
                disabled
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mt-2">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                value={newProduct.stock || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })
                }
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                placeholder="Stock"
                disabled
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mt-2">
                Category
              </label>
              <select
                id="category"
                value={newProduct.category_id || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category_id: parseInt(e.target.value),
                  })
                }
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                required>
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mt-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files?.[0] })
                }
                className="border p-2 w-full rounded"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isProcessing}
            >
              {isProcessing ? 'Adding...' : 'Add Product'}
            </button>
          </form>

          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Filter Products</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent">
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Min Price</label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                    placeholder="Min Price"
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2">Max Price</label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                    placeholder="Max Price"
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2">Min Stock</label>
                  <input
                    type="number"
                    name="minStock"
                    value={filters.minStock}
                    onChange={handleFilterChange}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                    placeholder="Min Stock"
                  />
                </div>
                <div>
                  <label className="block mb-2">Max Stock</label>
                  <input
                    type="number"
                    name="maxStock"
                    value={filters.maxStock}
                    onChange={handleFilterChange}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                    placeholder="Max Stock"
                  />
                </div>
                <div>
                  <label className="block mb-2">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={filters.productName}
                    onChange={handleFilterChange}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                    placeholder="Filter by product name"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap relative group">
                      {product.image_url && (
                        <>
                          <img src={product.image_url} alt={product.name} className="h-20 w-20 object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleOpenModal(product.image_url)}
                              className="text-white text-2xl"
                            >
                              🔍
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4">{product.description.substring(0, 100)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* ${product.price.toFixed(2)} */}--
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{/* {product.stock} */}--</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.category_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteConfirmation(product)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 ">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                <form onSubmit={handleUpdate}>
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mt-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="edit-name"
                      value={editProduct?.name}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct!, name: e.target.value })
                      }
                      className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                      placeholder="Product name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mt-2">
                      Description
                    </label>
                    <textarea
                      id="edit-description"
                      value={editProduct?.description}
                      onChange={(e) =>
                        setEditProduct({ ...editProduct!, description: e.target.value })
                      }
                      className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                      placeholder="Product description"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mt-2">
                      Price
                    </label>
                    <input
                      type="number"
                      id="edit-price"
                      value=/* {editProduct?.price} */ ""
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct!,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                      placeholder="Price"
                      step="0.01"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-stock" className="block text-sm font-medium text-gray-700 mt-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      id="edit-stock"
                      value=/* {editProduct?.stock} */ ""
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct!,
                          stock: parseInt(e.target.value),
                        })
                      }
                      className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                      placeholder="Stock"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mt-2">
                      Category
                    </label>
                    <select
                      id="edit-category"
                      value={editProduct?.category_id}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct!,
                          category_id: parseInt(e.target.value),
                        })
                      }
                      className="border p-2 w-full rounded focus:outline-none focus:ring-2 pl-2 focus:ring-orange-600 caret-orange-500 focus:placeholder-transparent"
                      required>
                      <option value="" disabled>Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700 mt-2">
                      Image
                    </label>
                    <input
                      type="file"
                      id="edit-image"
                      onChange={(e) =>
                        setEditProduct({ ...editProduct!, image: e.target.files?.[0] })
                      }
                      className="border p-2 w-full rounded"
                      accept="image/*"
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Updating...' : 'Update Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {isProcessing && <Spinner />}
          <ConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={() => setIsConfirmationOpen(false)}
            onConfirm={handleDelete}
            itemType="Producto"
            itemName={productToDelete?.name || ''}
          />
        </>
      )}
    </div>
  );
}