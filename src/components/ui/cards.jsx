export function Card({ children, className }) {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:border-[#d4af37]  transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
}