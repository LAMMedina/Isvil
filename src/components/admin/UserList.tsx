import React, { useState, useEffect } from 'react';
import Spinner from '@admin/Spinner';
import ConfirmationModal from '@admin/ConfirmationModal';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    password: '',
    role: 'user'
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    setNewUser({ email: '', name: '', password: '', role: 'user' });
    fetchUsers();
    setLoading(false);
  }

  function confirmDelete(id: number) {
    setUserToDelete(id);
    setShowConfirmation(true);
  }

  async function handleDelete() {
    if (userToDelete === null) return;
    setLoading(true);
    await fetch(`/api/users/${userToDelete}`, { method: 'DELETE' });
    fetchUsers();
    setLoading(false);
    setShowConfirmation(false);
    setUserToDelete(null);
  }

  async function handleEdit(user: User) {
    setEditingUser(user);
    setShowModal(true);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser) return;

    await fetch(`/api/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingUser),
    });
    setEditingUser(null);
    setShowModal(false);
    fetchUsers();
  }

  if (loading) return <Spinner />;
  
  return (
    <div>
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Usuario</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nombre"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            /* value={newUser.password} */
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Rol
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Agregar Usuario
          </button>
        </div>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between mb-2 bg-white p-4 rounded shadow">
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm">Rol: {user.role}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => confirmDelete(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Editar Usuario</h3>
              <form onSubmit={handleUpdate} className="mt-2 px-7 py-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="Nombre"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2 text-left">
                  Email
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="Email"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                />
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mt-2 text-left">
                  Rol
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
                <div className="items-center px-4 py-3">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Actualizar Usuario
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2 mt-2">
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
          itemType="Usuario"
          itemName={users.find(user => user.id === userToDelete)?.name || ''}
        />
      )}
    </div>
  );
}