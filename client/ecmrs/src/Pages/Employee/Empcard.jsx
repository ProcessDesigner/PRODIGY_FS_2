import { useNavigate } from 'react-router-dom';

function Empcard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded shadow-md p-4 cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/employee/description/${data._id}`, { state: { ...data } })}
    >
      <div className="flex justify-center mb-4">
        <img
          src={data.image?.secure_url}
          alt="image"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <h2 className="text-lg font-bold mb-2">{data.fullName}</h2>
      <p className="text-gray-600 text-sm">{data.department}</p>
    </div>
  );
}

export default Empcard;