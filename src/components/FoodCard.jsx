export default function FoodCard({ product }) {
  return (
    <div className="card">
      <h3>{product.product_name}</h3>
      <p>{product.brands}</p>

      <img
        src={product.image_small_url || "https://via.placeholder.com/100"}
        alt={product.product_name}
      />

      <p>Calories: {product.nutriments?.["energy-kcal_100g"] || "N/A"}</p>
      <p>Protein: {product.nutriments?.proteins_100g || "N/A"}</p>
      <p>Carbs: {product.nutriments?.carbohydrates_100g || "N/A"}</p>
    </div>
  );
}