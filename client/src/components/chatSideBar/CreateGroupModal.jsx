import { useState, useRef } from "react";

const CreateGroupModal = ({ handleClose, friends, handleGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const fileRef = useRef();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageClick = () => {
    fileRef.current.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSelectMember = (e, id) => {
    if (e.target.checked) {
      setSelectedMembers((prev) => [...prev, id]);
    } else {
      setSelectedMembers((prev) => prev.filter((memberId) => memberId !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-100 rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create Group</h2>
          <button className="text-2xl" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 mb-5">
          <img
            src={preview || "https://i.pravatar.cc/150?img=10"}
            alt="preview"
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full  outline-4 outline-[#004953] cursor-pointer object-cover"
          />
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="text-sm text-gray-500">Click the Image to Upload</p>
        </div>

        <input
          type="text"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          placeholder="Group Name"
          className="w-full px-4 py-2 border rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-[#004953]"
        />

        <h4 className="font-medium mb-2">Select Friends</h4>

        <div className="bg-gray-50 border rounded-lg p-3 max-h-37.5 overflow-y-auto mb-5 space-y-2">
          {friends?.map((f) => (
            <label key={f._id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedMembers.includes(f._id)}
                onChange={(e) => handleSelectMember(e, f._id)}
              />
              {f.name}
            </label>
          ))}
        </div>

        <button
          onClick={() =>
            handleGroup(file, groupName, selectedMembers, handleClose)
          }
          className="w-full bg-[#004953] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
