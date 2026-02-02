import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

const CATEGORIES = [
  "All",
  "Education",
  "Technology",
  "Music",
  "Gaming",
  "Lifestyle",
];

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const location = useLocation();
  const searchQuery =
    new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");
        setVideos(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) => {
    const title = typeof video?.title === "string" ? video.title : "";
    const category =
      typeof video?.category === "string" ? video.category : "";

    const matchesSearch = title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading videos...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Category Filter Buttons */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1 rounded-full border text-sm whitespace-nowrap ${
              activeCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <h1 className="text-xl font-bold mb-4">Recommended</h1>

      {filteredVideos.length === 0 ? (
        <p className="text-gray-500">No videos found</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
