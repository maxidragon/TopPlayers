import { Typography, Link, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        Made with{" "}
        <FavoriteIcon sx={{ color: "red", verticalAlign: "middle" }} /> by{" "}
        <Link
          href="https://github.com/maxidragon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Maksymilian Gala
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        If you like this website, you can support me by giving a star on GitHub.
        Also, if you have any suggestions or ideas, feel free to contact me or
        submit a GitHub issue.
      </Typography>
      <Typography align="center">
        <IconButton
          aria-label="GitHubIcon"
          href="https://github.com/maxidragon/TopPlayers"
          target="_blank"
        >
          <GitHubIcon sx={{ color: "#000" }} fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="EmailIcon"
          href="mailto:contact@maksymiliangala.com"
        >
          <EmailIcon sx={{ color: "#000" }} fontSize="large" />
        </IconButton>
      </Typography>
    </>
  );
};

export default Footer;
