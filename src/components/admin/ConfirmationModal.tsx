// Componente de Confirmación
const ConfirmationModal = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar: {itemType} "{itemName}"?</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
};

export default ConfirmationModal;