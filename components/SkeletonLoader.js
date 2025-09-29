// components/SkeletonLoader.js
export default function SkeletonLoader({ width = "100%", height = 20, borderRadius = 6 }) {
  return (
    <div style={{
      width,
      height,
      borderRadius,
      background: "linear-gradient(-90deg, #ececec 0%, #f5f5f5 50%, #ececec 100%)",
      backgroundSize: "200% 100%",
      animation: "shine 1.5s infinite",
      margin: "5px 0"
    }} />
  );
}
