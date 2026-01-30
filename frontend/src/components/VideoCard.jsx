import { Link } from 'react-router-dom';

function VideoCard({ video }) {
    return (
        <Link to={`/video/${video._id}`}>
            <div className="bg-white rounded shadow hover:shadow-lg transition">
                <img 
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-40 object-cover rounded-t"
                />

                <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2">
                        {video.title}
                    </h3>

                    <p className="text-xs text-gray-600 mt-1">
                        {video.channel?.channelName}
                    </p>

                    <p className="text-xs text-gray-500">
                        {video.views} views 
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default VideoCard;