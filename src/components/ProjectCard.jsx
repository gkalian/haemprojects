import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

/**
 * ProjectCard component to display project information
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @returns {JSX.Element} Project card component
 */
const ProjectCard = ({ project }) => {
  const linkConfigs = [
    {
      href: project.nexusmodsLinkLE,
      text: "NexusMods LE",
      color: "rgba(217, 143, 64, 0.7)",
    },
    {
      href: project.nexusmodsLinkSE,
      text: "NexusMods SE",
      color: "rgba(129, 150, 236, 0.7)",
    },
    {
      href: project.nexusmodsOblRe,
      text: "NexusMods",
      color: "rgba(217, 143, 64, 0.7)",
    },
    {
      href: project.bethesdaPC,
      text: "Bethesda PC",
      color: "rgba(255, 255, 255, 0.4)",
    },
    {
      href: project.bethesdaPS4,
      text: "Bethesda PS4",
      color: "rgba(255, 255, 255, 0.4)",
    },
    {
      href: project.bethesdaXB,
      text: "Bethesda XB1",
      color: "rgba(255, 255, 255, 0.4)",
    },
    { href: project.tesallLE, text: "TESAll", color: "rgba(44, 129, 94, 0.4)" },
    {
      href: project.tesallSE,
      text: "TESAll SE",
      color: "rgba(94, 204, 158, 0.4)",
    },
    {
      href: project.tesallOblRe,
      text: "TESAll",
      color: "rgba(94, 204, 158, 0.4)",
    },
  ].filter((link) => link.href);

  return (
    <Box
      sx={{
        margin: "16px 0",
        padding: "16px 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              width: "100%",
              height: 450,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 8,
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Box
              component="img"
              src={project.image}
              alt={project.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "8px",
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              letterSpacing: "0.5px",
              marginBottom: "16px",
              fontSize: "1rem",
            }}
          >
            Game: <span style={{ fontWeight: 600 }}>{project.game}</span>,
            Released:{" "}
            <span style={{ fontWeight: 600 }}>{project.released}</span>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              fontSize: "1.1rem",
              letterSpacing: "0.3px",
              marginBottom: "16px",
            }}
          >
            {project.firstDescription}
          </Typography>
          {project.secondDescription && (
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.6,
                fontSize: "1.1rem",
                letterSpacing: "0.3px",
                marginBottom: "16px",
              }}
            >
              {project.secondDescription}
            </Typography>
          )}

          <Box sx={{ marginTop: "auto", paddingTop: 3 }}>
            {linkConfigs.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  display: "inline-flex",
                  marginRight: "8px",
                  marginBottom: "8px",
                  alignItems: "center",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "all 0.2s ease",
                  padding: "8px 16px",
                  borderRadius: 4,
                  backgroundColor: link.color,
                  "&:hover": {
                    backgroundColor: link.color
                      .replace("0.4", "0.6")
                      .replace("0.7", "0.9")
                      .replace("0.2", "0.4"),
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectCard;
