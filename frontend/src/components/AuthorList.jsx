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
  const [authorDetails, setAuthorDetails] = useState({});
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

  useEffect(function () {
    async function getAuthorDetails() {
      const response = await api.get(`/auth/authors/${author}`);
      // console.log(response.data.results);

      if (response.status === 200) {
        setAuthorDetails(response.data);
      }
    }

    getAuthorDetails();
  }, []);

  function ProfileCard({ name, shortBio, bio }) {
    return (
      <>
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
              {shortBio}
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

        <Typography className="text-xl italic w-1/3">{bio}</Typography>
      </>
    );
  }

  return (
    <>
      <section className="flex mt-10 gap-3 justify-center">
        <ProfileCard
          name={authorDetails.name}
          bio={authorDetails.about}
          shortBio={authorDetails.short_about}
        />
      </section>

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
