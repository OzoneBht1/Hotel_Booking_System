import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ArrowRight } from "@mui/icons-material";

interface IListPropertiesLandingProps {
  onClickNext: () => void;
}

const ListPropertiesLanding = ({
  onClickNext,
}: IListPropertiesLandingProps) => {
  const onClickGetStarted = () => {
    onClickNext();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      padding={3}
      borderRadius={2}
    >
      <Typography component="h1" variant="h5">
        List your properties on TravAlly and start welcoming guests in no time!
      </Typography>

      <Typography component="h2" variant="h4">
        Your peace of mind is our top priority
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography>
          Here's how we help you feel confident welcoming guests :
        </Typography>
        <Box display="flex" alignItems="center">
          <List aria-label="hotel safety measures">
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Set house rules guest must agree to before they stay" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Report guest misconduct if something goes wrong" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Request damage deposits for extra security" />
            </ListItem>
            <ListItem>
              <Button variant="contained" onClick={onClickGetStarted}>
                Get Started <ArrowRight />
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ListPropertiesLanding;
