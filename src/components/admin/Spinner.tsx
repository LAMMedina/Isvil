// Componente Spinner
const Spinner = () => (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

export default Spinner;