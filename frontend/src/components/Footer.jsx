import { Typography } from "@material-tailwind/react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-row items-center justify-center border-t border-blue-gray-50 py-4 text-center bg-blue-gray-900 bottom-0 sticky">
      <Typography color="blue-gray" className="font-normal text-blue-gray-100">
        &copy; {currentYear} EduReel
      </Typography>
    </footer>
  );
}

export default Footer;
