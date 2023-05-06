import SearchIcon from "@mui/icons-material/Search";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

interface ISearchProps {
  handleSearch: (search: string) => void;
}
const Search = ({ handleSearch }: ISearchProps) => {
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search customer"
        onChange={(e) => handleSearch(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};

export default Search;
