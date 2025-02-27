export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out ${className}`}
      {...props}
    />
  );
}