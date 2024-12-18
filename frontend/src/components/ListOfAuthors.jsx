import { useEffect, useState } from "react";

// import data from "../assets/academics.json"
import axios from "axios";
import { Avatar, Typography } from "@material-tailwind/react";

import { Link } from "react-router-dom";

function ListOfAuthors() {
  const [academicsList, setAcademicsList] = useState([]);

  useEffect(function () {
    async function getData() {
      try {
        const response = await axios.get("/assets/academics.json");
        setAcademicsList(response.data.astronomy_academics || []);
      } catch (err) {
        console.error("Can't get data:", err);
      }
    }

    getData();
  }, []);

  if (!academicsList) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="pr-8 py-14">
        <Typography variant="h4" className="">
          Contributors
        </Typography>
        {academicsList.map((each) => (
          <div
            className="flex items-center"
            key={each.name}
            // href="http://localhost:5174/authorboard/username55"
          >
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt={each.name}
              className="inline-block relative object-cover object-center w-16 h-16 rounded-lg border border-green-600 p-0.5 mr-1"
              //   as={Link}
              //   to={`/authorboard/username55`}
            />
            <div className="flex flex-col justify-center">
              <Typography
                className="font-bold text-blue-900"
                as={Link}
                to={`/authorboard/username55`}>
                {each.name}
              </Typography>
              <Typography className="">{each.specialty}</Typography>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default ListOfAuthors;
