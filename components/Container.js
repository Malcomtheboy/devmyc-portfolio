// Centres content and applies the same side padding on every page.
export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-page px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
