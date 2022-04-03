import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {fetchNewsData} from '../Redux/reducers/newsSlice';
import {newsFilters} from '../Redux/selectors';
import Stack from '@mui/material/Stack';

const Filter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [sortOrder, setSortOrder] = useState('publishedAt');
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const filters = useSelector(newsFilters);
  const [filter, setFilter] = useState({
    sortBy: '',
    from: '',
    to: ''
  });
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const formatDate= (date) => {
    let nwDate = new Date(date);
    let day = nwDate.getDate(); 
    let month = nwDate.getMonth();
    let year = nwDate.getFullYear()
    let dateStr = `${year}-${month}-${day}`;
    return dateStr;
  }

  const handleClose = () => {
    setFilter(state => ({
      ...filters,
      ...state,
      sortBy: sortOrder,
      from: formatDate(fromDate),
      to: formatDate(toDate)
    }))
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchNewsData(filter));
  },[filter]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterListIcon className='filter-icon'/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Accordion style={{width: '100%'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sort</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  aria-labelledby="sort-group"
                  value={sortOrder}
                  name="sort-group"
                  onChange={(e, value) => {
                    setSortOrder(value);
                  }}
                >
                  <FormControlLabel value="publishedAt" control={<Radio />} label="Published at" />
                  <FormControlLabel value="relevancy" control={<Radio />} label="relevancy" />
                  <FormControlLabel value="Popularity" control={<Radio />} label="Popularity" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </MenuItem>
        <MenuItem >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Published dates</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DatePicker
                      disableFuture
                      label="From"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={fromDate}
                      onChange={(newValue) => {
                        setfromDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      disableFuture
                      label="To"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      value={toDate}
                      onChange={(newValue) => {
                        setToDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </MenuItem>
        <Button variant="outlined" onClick={handleClose} style={{float: 'right', margin: '10px 16px'}}>Filter</Button>
      </Menu>
    </div>
  );
}

export default Filter;