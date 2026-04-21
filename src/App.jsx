import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

function App() {
  // 🔹 State
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 🔹 Fetch function
  async function handleSearch(query) {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);

      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&json=true`
      );

      const data = await res.json();

      // ✅ Filter valid products
      const filteredProducts = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ""
      );

      setResults(filteredProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 UI Rendering
  return (
    <div className="app">
      <h1>🍽️ FoodFacts</h1>

      <SearchBar onSearch={handleSearch} />

      {/* 🔄 Loading State */}
      {loading && <p>Loading...</p>}

      {/* 🟡 Initial State */}
      {!loading && !hasSearched && (
        <p>Start by searching for a food item 🥗</p>
      )}

      {/* ❌ No Results */}
      {!loading && hasSearched && results.length === 0 && (
        <p>No results found 😢</p>
      )}

      {/* ✅ Results */}
      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  );
}

export default App;