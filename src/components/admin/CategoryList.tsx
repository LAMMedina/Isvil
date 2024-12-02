import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ConfirmationModal from '@admin/ConfirmationModal';

interface Category {
  id: number;
  name: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Error fetching categories');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });
      if (!response.ok) throw new Error('Failed to create category');
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      setError('Error creating category');
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(category: Category) {
    setEditingCategory(category);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCategory) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingCategory.name }),
      });
      if (!response.ok) throw new Error('Failed to update category');
      fetchCategories();
      setEditingCategory(null);
    } catch (err) {
      setError('Error updating category');
    } finally {
      setLoading(false);
    }
  }

  function confirmDelete(id: number) {
    setCategoryToDelete(id);
    setShowConfirmation(true);
  }

  async function handleDelete() {
    if (categoryToDelete === null) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${categoryToDelete}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete category');
      fetchCategories();
    } catch (err) {
      setError('Error deleting category');
    } finally {
      setLoading(false);
      setShowConfirmation(false);
      setCategoryToDelete(null);
    }
  }

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Agregar Nueva Categoría</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nombre de la categoría"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Agregar Categoría
          </button>
        </div>
      </form>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Categorías</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{category.name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div>
                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(category.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingCategory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Categoría</h3>
              <form onSubmit={handleUpdate} className="mt-2 px-7 py-3">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="Nombre de la Categoría"
                  className="mt-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <div className="items-center px-4 py-3">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Actualizar Categoría
                  </button>
                  <button
                    type="button"
                    onClick={() => editingCategory && setEditingCategory(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2 mt-2"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
      {showConfirmation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleDelete}
          itemType="Categoría"
          itemName={categories.find(category => category.id === categoryToDelete)?.name || ''}
        />
      )}
    </div>
  );
}