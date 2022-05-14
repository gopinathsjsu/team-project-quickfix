import React, { useEffect, useHistory } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Navigate } from "react-router";

import backendServer from "../../webConfig";
import { getDate } from "date-fns";
import { getDay } from "date-fns/esm";
const axios = require("axios");

function valuetext(value) {
  return `${value}$`;
}

export default function BookingModal({ BookingDetails }) {
  let booking = { BookingDetails };
  const [value, setValue] = React.useState(null);
  const history = useNavigate();
  const [startDate, setStartDate] = React.useState(null);
  const [days, setDays] = React.useState(0);
  const [endDate, setEndDate] = React.useState(null);
  const [ratingValue, setRatingValue] = React.useState(2);
  const [guests, setGuests] = React.useState(2);
  const [rooms, setRooms] = React.useState(1);
  const [cost, setCost] = React.useState(0);
  sessionStorage.setItem("cost", 0);
  const [roomCost, setRoomCost] = React.useState(0);
  const [roomtype, setRoomType] = React.useState("cd");
  const [mapping, setMapping] = React.useState("");
  const [Breakfast, setBreakfast] = React.useState(false);
  const [fitnessRoom, setFitnessRoom] = React.useState(false);
  const [swimming, setSwimming] = React.useState(false);
  const [parking, setParking] = React.useState(false);
  const [meals, setMeals] = React.useState(false);

  // const handleCostChange = (event, newCost) => {
  //     setCost(newCost);
  // };

  const addGuests = async () => {
    await setGuests(guests + 1);
    console.log(guests);
    // getDays();
    // setCost(parseFloat(mapping[roomtype]) + (50* guests)*rooms)
    // await calculatePrice();
  };
  const subGuests = async () => {
    await setGuests(guests - 1);
    console.log(guests);
    // getDays();
    // await calculatePrice();
    // setCost((parseFloat(mapping[roomtype])* days) + (50* guests)* rooms)
  };

  const getDays = async () => {
    await setDays(getDate(endDate) - getDate(startDate));
    sessionStorage.setItem("days", getDate(endDate) - getDate(startDate));
    // console.log(days)
  };
  const addRooms = async () => {
    await setRooms(rooms + 1);
    await getDays();
    // await calculatePrice();
  };

  const subRooms = async () => {
    await setRooms(rooms - 1);
    await getDays();
    // await calculatePrice();
  };

  async function calculatePrice() {
    await getDays();
    var sessionDays = await sessionStorage.getItem("days");
    console.log(sessionDays, mapping[roomtype], roomtype, guests, rooms);

    // if(getDay(startDate))
    if (getDay(startDate) > 5 || getDay(endDate) > 5) {
      await setCost(
        parseFloat(mapping[roomtype]) * sessionDays * 0.15 + 50 * guests * rooms
      );
    } else {
      await setCost(
        parseFloat(mapping[roomtype]) * sessionDays + 50 * guests * rooms
      );
    }
  }

  const handleRoomChange = async (event) => {
    await setRoomType(event.target.value);
    // let roomtype = await event.target.value;
    // console.log(roomtype);
    // // let mapping = BookingDetails.Room_type_rate_mapping;
    // console.log(mapping[roomtype]);
    // let roomcost = await parseFloat(mapping[roomtype]);
    // // setCost(cost+ roomcost);
    // await calculatePrice();
  };

  React.useEffect(() => {
    console.log({ BookingDetails });
    setMapping(BookingDetails.Room_type_rate_mapping);
    console.log(mapping);
  }, [BookingDetails, roomtype]);

  const createBooking = () => {
    console.log(booking);
    let amenities = [];
    if (Breakfast == true) {
      amenities.push("Daily Continental Breakfast");
    }
    if (swimming == true) {
      amenities.push("Access to Swimming Pool/Jacuzzi");
    }
    if (fitnessRoom == true) {
      amenities.push("Access to fitness room");
    }
    if (meals == true) {
      amenities.push("All meals included (Breakfast, Lunch, Dinner)");
    }

    let data = {
      Hotel_id: BookingDetails._id,
      Customer_id: sessionStorage.getItem("userid"), //BookingDetails.cust_id,
      Hotel_name: BookingDetails.Hotel_name,
      Customer_name: sessionStorage.getItem("username"), //BookingDetails.cust_name,
      Booking_period_days: getDate(endDate) - getDate(startDate),
      Booking_start_date: startDate,
      Booking_end_date: endDate,
      Total_cost: cost,
      Created_at: BookingDetails.Created_at,
      Hotel_image: BookingDetails.Profile_image,
      Amenities: amenities, //BookingDetails.Amenities
    };
    console.log(getDate(startDate) - getDate(endDate));
    console.log(data);
    axios
      .post(`${backendServer}/api/booking/newBooking`, data)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          // return "Success"
          alert("Booking Confirmed");
          history("/Bookings");
        }
      });
  };

  useEffect(() => {
    calculatePrice();
  }, [roomtype, rooms, guests]);

  return (
    <div>
      <Container>
        <h1>Hotel Booking</h1>
        <br />
        <Stack>
          <Stack direction={"row"} justifyContent={"space-around"}>
            {/*<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>*/}
            {/*    <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />*/}
            {/*    <TextField id="input-with-sx" label="Location" variant="standard" />*/}
            {/*</Box>*/}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-in Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-out Date"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <div>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <div>
                <br />
                Amenities
                <Stack>
                  <FormGroup>
                    <FormControlLabel
                      value={Breakfast}
                      onClick={() => {
                        setBreakfast(!Breakfast);
                      }}
                      control={<Checkbox />}
                      label="Daily Continental Breakfast"
                    />
                    <FormControlLabel
                      value={fitnessRoom}
                      onClick={() => {
                        setFitnessRoom(!fitnessRoom);
                      }}
                      control={<Checkbox />}
                      label="Access to fitness room"
                    />
                    <FormControlLabel
                      value={parking}
                      onClick={() => {
                        setParking(!parking);
                      }}
                      control={<Checkbox />}
                      label="Daily Parking"
                    />
                    <FormControlLabel
                      value={meals}
                      onClick={() => {
                        setMeals(!meals);
                      }}
                      control={<Checkbox />}
                      label="All meals included (Breakfast, Lunch, Dinner)"
                    />
                    <FormControlLabel
                      value={swimming}
                      onClick={() => {
                        setSwimming(!swimming);
                      }}
                      control={<Checkbox />}
                      label="Access to Swimming Pool/Jacuzzi"
                    />
                  </FormGroup>
                  <br />
                  <h3>Total Cost: {isNaN(cost) ? 0 : cost}</h3>
                </Stack>
              </div>
              <Stack direction={"column"}>
                <div>
                  <br />
                  <FormControl fullWidth>
                    <InputLabel>Room type</InputLabel>
                    <Select
                      value={roomtype}
                      label="RoomType"
                      onChange={handleRoomChange}
                    >
                      <MenuItem value={"doubleRoom"}>Double Rooms</MenuItem>
                      <MenuItem value={"suites"}>Suites</MenuItem>
                      <MenuItem value={"singleRoom"}>Single Room</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                Number of guests: {guests}
                <Button variant="outlined" onClick={addGuests}>
                  +
                </Button>
                <Button variant="outlined" onClick={subGuests}>
                  -
                </Button>
                <br />
                Number of rooms: {rooms}
                <Button variant="outlined" onClick={addRooms}>
                  +
                </Button>
                <Button variant="outlined" onClick={subRooms}>
                  -
                </Button>
                <br />
                <Stack>
                  <Button variant="outlined" onClick={createBooking}>
                    Confirm
                  </Button>
                  <br />
                  {/* <Button variant="outlined" >Modify</Button>
                                    <br/> */}
                  {/* <Button variant="outlined">Cancel</Button> */}
                </Stack>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Container>
      <br />
    </div>
  );
}
