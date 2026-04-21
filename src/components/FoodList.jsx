import FoodCard from "./FoodCard";

export default function FoodList({ products }) {
  return (
    <div>
      {products.map((p) => (
        <FoodCard key={p.code} product={p} />
      ))}
    </div>
  );
}