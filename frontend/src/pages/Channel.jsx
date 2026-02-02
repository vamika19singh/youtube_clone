import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

function Channel() {
    const { id } = useParams();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const channelRes = await API.get(`/channels/${id}`);
                const videoRes = await API.get(`/videos/channel/${id}`);

                setChannel(channelRes.data);
                setVideos(videoRes.data);
            } catch (error) {
                console.log("Failed to fetch channel data");
            } finally {
                setLoading(false);
            }
        };

        fetchChannel();
    }, [id]);

    if(loading) {
        return <div className="p-6">Loading channel...</div>;
    }

    if(!channel) {
        return <div className="p-6">Channel not found</div>;
    }

    return (
        <div className="p-6">
            {/* Channel Info */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        {channel.channelName}
                    </h1>
                    <p className="text-sm text-gray-600">
                        {channel.subscribers || 0} subscribers
                    </p>
                </div>

                <button className="bg-red-600 text-white px-4 py-2 rounded">
                    Subscribe 
                </button>
            </div>

            {/* Channel videos */}
            <h2 className="text-lg font-semibold mb-4">Videos</h2>
            
            {videos.length === 0 ? (
                <p className="text-gray-500">
                    No videos uploaded yet 
                </p>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Channel;

