export default function SkeletonLoader({ width = "100%", height = "20px", style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius: "6px",
        margin: "6px 0",
        ...style,
      }}
    />
  );
}
