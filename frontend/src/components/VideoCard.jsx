import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

import ReactPlayer from "react-player/lazy";

import { truncateText } from "../util/text";
import { formatDistanceToNow } from "date-fns";

const VideoCard = ({
  video_id,
  title,
  url,
  author,
  description,
  date_uploaded,
  date_released,
  likes,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    // Close the dialog
    handleOpen();

    // TODO: Implement delete functionality using the DELETE API endpoint

    // Call the delete function
    onDelete(video_id);

    console.log("Delete post with id:", video_id);
  };

  return (
    <Card className="mt-6 bg-blue-gray-100 flex">
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete this Video?</DialogHeader>

        <DialogBody>
          This action will permanently delete this video. Are you sure you want
          to continue?
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1">
            <span>Cancel</span>
          </Button>

          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <CardBody className="flex">
        <div className="flex items-center p-2">
          {/* <p>this is just for the video thumbnail</p> */}
          <div className="aspect-[16/9] mr-4 w-64">
            <ReactPlayer
              className="h-full v-full"
              width="100%"
              height="100%"
              light={true}
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center">
            <Typography variant="h5" color="blue-gray" className="mb-0">
              {title}
            </Typography>

            <IconButton
              variant="text"
              color="blue-gray"
              size="sm"
              onClick={handleOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24">
                <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
              </svg>
            </IconButton>
          </div>

          <Typography
            variant="h6"
            color="blue"
            className="mb-2"
            as={Link}
            to={`/authorboard/${author}`}>
            {author}
          </Typography>

          <Typography className="min-h-6">
            {truncateText(description, 80)}
          </Typography>
          <Typography color="blue-gray" variant="small">
            {formatDistanceToNow(date_uploaded, { addSuffix: true })}
          </Typography>

          <Button className="mt-2" onClick={() => onReadMore(video_id)}>
            Read More
          </Button>
        </div>
      </CardBody>

      {/* <CardFooter className="pt-0">
        <Button onClick={() => onReadMore(video_id)}>Read More</Button>
      </CardFooter> */}
    </Card>
  );
};

export default VideoCard;
