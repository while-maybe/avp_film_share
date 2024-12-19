import { useEffect, useState } from "react";
import api from "../api/axios";
import VideoCard from "./VideoCard";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  //   Typography,
  Tooltip,
} from "@material-tailwind/react";

// get the videos from the list endpoint
function AuthorList() {
  const [videos, setVideos] = useState([]);
  const { author } = useParams();

  useEffect(function () {
    async function getVideosByAuthor() {
      const response = await api.get(`/data/list/?search=${author}`);
      // console.log(response.data.results);

      if (response.status === 200) {
        setVideos(response.data.results);
      }
    }

    getVideosByAuthor();
  }, []);

  function ProfileCard({ name }) {
    return (
      <Card className="w-96">
        <CardHeader floated={false} className="h-80">
          <img
            src="https://docs.material-tailwind.com/img/team-3.jpg"
            alt="profile-picture"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            CEO / Co-Founder
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content="Like">
            <Typography
              as="a"
              href="#facebook"
              variant="lead"
              color="blue"
              textGradient>
              <i className="fab fa-facebook" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography
              as="a"
              href="#twitter"
              variant="lead"
              color="light-blue"
              textGradient>
              <i className="fab fa-twitter" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography
              as="a"
              href="#instagram"
              variant="lead"
              color="purple"
              textGradient>
              <i className="fab fa-instagram" />
            </Typography>
          </Tooltip>

          <Tooltip content="Share">
            <Typography
              as="a"
              href="#share"
              variant="lead"
              color="red"
              textGradient>
              <i className="fas fa-share" />
            </Typography>
          </Tooltip>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      <div className="flex mt-10 gap-3 justify-center">
        {/* <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          size="xxl"
        /> */}

        <ProfileCard name={author} />

        <Typography className="w-1/3">
          Dr. Alex Carter is a distinguished professor of Environmental Sciences
          at the University of Crestwood, where they have been a faculty member
          since 2012. Specializing in climate adaptation strategies and
          sustainable resource management, Dr. Carter's research bridges the gap
          between theoretical models and practical solutions for mitigating the
          impacts of climate change. With over 50 peer-reviewed publications and
          multiple speaking engagements at international conferences, they have
          established themselves as a thought leader in the field. Dr. Carter's
          groundbreaking work on urban heat island effects has been recognized
          with awards from the Global Sustainability Institute and the National
          Science Foundation. Outside the lab, they are passionate about
          mentoring the next generation of scientists, serving as an advisor for
          graduate research programs and a director for community-based
          environmental initiatives. When not immersed in academia, Dr. Carter
          enjoys hiking, photography, and exploring biodiversity in remote
          landscapes, blending personal interests with their professional
          dedication to the natural world.
        </Typography>
      </div>

      <Typography className="text-center mt-8">Showing 58 results</Typography>

      <section className="container mx-auto px-8 py-10 flex justify- flex-wrap gap-4">
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
    </>
  );
}

export default AuthorList;
