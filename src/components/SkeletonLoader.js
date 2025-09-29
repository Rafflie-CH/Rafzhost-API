export default function SkeletonLoader({ count = 3, height = "20px", width = "100%", style = {} }) {
  const skeletons = Array.from({ length: count });
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"10px", ...style }}>
      {skeletons.map((_,i) => (
        <div key={i} className="skeleton" style={{ height, width, borderRadius:"6px" }}/>
      ))}
    </div>
  );
}
