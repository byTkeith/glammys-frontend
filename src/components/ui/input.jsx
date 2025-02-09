export function Input({ className, ...props }) {
    return <input className={`w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 ${className}`} {...props} />;
  }