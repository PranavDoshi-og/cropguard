export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-6"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}