import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/videos/${id}`);
        setVideo(res.data);
      } catch (error) {
        console.error("Failed to fetch video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);
  if (loading) return <div className="p-6">Loading video...</div>;

  const handleLike = async () => {
    await API.post(`/videos/${id}/like`);
    setVideo({ ...video, likes: video.likes + 1 });
  };

  const handleDislike = async () => {
    await API.post(`/videos/${id}/dislike`);
    setVideo({ ...video, dislikes: video.dislikes + 1 });
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await API.post(`/videos/${id}/comment`, {
        text: comment,
      });

      const updated = await API.get(`/videos/${id}`);
      setVideo(updated.data);
      setComment("");
    } catch (error) {
      console.error("Comment failed:", error.response?.data || error.message);
    }
  };
  if (!video) {
    return <div className="p-6">Loading video...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Section */}
      <div className="lg:col-span-2">
        <video src={video.videoUrl} controls className="w-full rounded" />

        <h1 className="mt-4 text-xl font-bold">{video.title}</h1>

        <div className="mt-1">
          <Link
            to={`/channel/${video.channel?._id}`}
            className="text-sm font-semibold text-gray-700 hover:underline"
            >
              {video.channel?.channelName}
            </Link>
        </div>

        <p className="text-sm text-gray-600 mt-1">{video.views} views</p>

        <div className="flex items-center space-x-4 mt-3">
          <button
            onClick={handleLike}
            className="px-4 py-1 bg-gray-200 rounded"
          >
            Like {video.likes}
          </button>

          <button
            onClick={handleDislike}
            className="px-4 py-1 bg-gray-200 rounded"
          >
            Dislike {video.dislikes}
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Comments</h2>

          <form onSubmit={handleComment} className="flex space-x-2 mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="flex-1 border p-2 rounded"
            />
            <button className="bg-red-600 text-white px-4 rounded">Post</button>
          </form>

          {!video.comments || video.comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet</p>
          ) : (
            video.comments.map((c, index) => (
              <div key={index} className="mb-2 border-b pb-1">
                <p className="text-sm font-semibold">
                  {c.user?.username || "User"}
                </p>
                <p className="text-sm">{c.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block">
        <p className="text-gray-500">Related videos coming soon...</p>
      </div>
    </div>
  );
}

export default VideoPlayer;
