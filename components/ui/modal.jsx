const Modal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-4 rounded-md w-96">
          <h2 className="text-xl font-semibold">Enter Remarks</h2>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks here..."
            className="w-full p-2 mt-2 border rounded-md"
          />
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(remarks)}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  