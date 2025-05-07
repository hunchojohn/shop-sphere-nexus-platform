
interface AuthToggleProps {
  isLoginMode: boolean;
  onToggle: (isLogin: boolean) => void;
}

export default function AuthToggle({ isLoginMode, onToggle }: AuthToggleProps) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => onToggle(true)}
          className={`px-4 py-2 text-sm font-medium rounded-l-lg ${isLoginMode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => onToggle(false)}
          className={`px-4 py-2 text-sm font-medium rounded-r-lg ${!isLoginMode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
        >
          Register
        </button>
      </div>
    </div>
  );
}
