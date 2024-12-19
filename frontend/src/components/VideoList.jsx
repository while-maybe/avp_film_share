import { useEffect, useState } from "react";
import api from "../api/axios";
import VideoCard from "./VideoCard";

// get the videos from the list endpoint
function VideoList() {
  const [videos, setVideos] = useState([]);

  async function getVideos() {
    const response = await api.get("/data/list/");
    // console.log(response.data.results);

    if (response.status === 200) {
      setVideos(response.data.results);
    }
  }

  useEffect(function () {
    getVideos();
  }, []);

  return (
    <section className="container max-w-full mx-auto px-8 py-10 flex justify-center flex-wrap gap-8 content-start">
      {videos.map((video) => (
        <VideoCard
          key={video.video_id}
          video_id={video.video_id}
          title={video.title}
          url={video.location}
          author={video.author_username}
          description={video.description}
          date_uploaded={video.date_uploaded}
          date_released={video.date_released}
          likes={video.likes}
          // onReadMore={onReadMore}
          // onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default VideoList;
