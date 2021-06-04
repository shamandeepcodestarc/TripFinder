import React, { useState ,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { FaMapMarkerAlt, FaRegCalendar, FaUserFriends } from 'react-icons/fa';
import { Button } from 'antd';
import DateRangePickerBox from 'components/UI/DatePicker/ReactDates';
import MapAutoComplete from 'components/Map/MapAutoComplete';
import { mapDataHelper } from 'components/Map/mapDataHelper';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import { setStateToUrl } from 'library/helpers/url_handler';
import { PROPERTY_SEARCH_PAGE } from 'settings/constant';
import axios from 'axios';

import './search.css'
import {
  FormWrapper,
  ComponentWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Search.style';

const calendarItem = {
  separator: '-',
  format: 'MM-DD-YYYY',
  locale: 'en',
};

const SearchForm = ({ history }) => {
   const [searchDate, setSearchDate] = useState({
    setStartDate: null,
    setEndDate: null,
  });
  const [mapValue, setMapValue] = useState([]);

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [listing, setListing] = useState([]);

  const [country_id, setCountry_id] = useState(0);
  const [state_id, setState_id] = useState(0);
  const [city_id, setCity_id] = useState(0);
  const [listing_id, setListing_id] = useState(0);
  
useEffect(() => {
 getCountries();
 getListing();
}, [])
const getCountries = () =>{
axios.get("http://codestarc.com/client/newproject/api/countries").then(response => {
      if (response && response.data && response.data.data && response.data.data.length !== 0) {
        setCountry(response.data.data)
      }
    })
}
const getListing = () =>{
axios.get("http://codestarc.com/client/newproject/api/listing").then(response => {
      if (response && response.data && response.data.data && response.data.data.length !== 0) {
        setListing(response.data.data)
      }
    })
}
const getStatesByCountryId = (id) =>{
  console.log(id);
axios.get(`http://codestarc.com/client/newproject/api/getCountryByState/${id}`).then(response => {
      if (response && response.data && response.data.data && response.data.data.length !== 0) {
        setState(response.data.data)
      }
    })
}
const getCitiesStatesId = (id) =>{
  console.log(id);
axios.get(`http://codestarc.com/client/newproject/api/getStateByCity/${id}`).then(response => {
      if (response && response.data && response.data.data && response.data.data.length !== 0) {
        setCity(response.data.data)
      }
    })
}
  // Room guest state
  const [roomGuest, setRoomGuest] = useState({
    room: 0,
    guest: 0,
  });

  const updatevalueFunc = (event) => {
    debugger
    const { searchedPlaceAPIData } = event;
    if (!isEmpty(searchedPlaceAPIData)) {
      setMapValue(searchedPlaceAPIData);
    }
  };

  // Room Guest data handling
  const handleIncrement = (type) => {
    setRoomGuest({
      ...roomGuest,
      [type]: roomGuest[type] + 1,
    });
  };

  const handleDecrement = (type) => {
    if (roomGuest[type] <= 0) {
      return false;
    }
    setRoomGuest({
      ...roomGuest,
      [type]: roomGuest[type] - 1,
    });
  };

  const handleIncDecOnChnage = (e, type) => {
    debugger
    let currentValue = e.target.value;

    setRoomGuest({
      ...roomGuest,
      [type]: currentValue,
    });
  };

  
  const goToSearchPage = () => {
    var listid = localStorage.setItem("listid",listing_id); 
     var countid = localStorage.setItem("countryid",country_id);
     var stateid = localStorage.setItem("stateid",state_id);
     var cityid = localStorage.setItem("cityid",city_id);

    let tempLocation = [];
    const mapData = mapValue ? mapDataHelper(mapValue) : [];
    mapData &&
      mapData.map((singleMapData, i) => {
        return tempLocation.push({
          formattedAddress: singleMapData ? singleMapData.formattedAddress : '',
          lat: singleMapData ? singleMapData.lat.toFixed(3) : null,
          lng: singleMapData ? singleMapData.lng.toFixed(3) : null,
        });
      });
    const location = tempLocation ? tempLocation[0] : {};
    const search = setStateToUrl();
    history.push({
      pathname:`${PROPERTY_SEARCH_PAGE}/${country_id}/${state_id}/${city_id}/${listing_id}`,
      search: search,
    });
    window.location.reload();
  };
  
  return (
    <FormWrapper>
      {/* <ComponentWrapper>
        <FaMapMarkerAlt className="map-marker" />
        <MapAutoComplete updatevalue={(value) => updatevalueFunc(value)} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 144.083 144"
          enableBackground="new 0 0 144.083 144"
          className="target"
        >
          <path d="M117.292,69h-13.587C102.28,53.851,90.19,41.761,75.042,40.337V26.5h-6v13.837C53.893,41.761,41.802,53.851,40.378,69  H26.792v6h13.587c1.425,15.148,13.515,27.238,28.663,28.663V117.5h6v-13.837C90.19,102.238,102.28,90.148,103.705,75h13.587V69z   M72.042,97.809c-14.23,0-25.809-11.578-25.809-25.809c0-14.231,11.578-25.809,25.809-25.809S97.85,57.769,97.85,72  C97.85,86.23,86.272,97.809,72.042,97.809z" />
          <path d="M72.042,52.541c-10.729,0-19.459,8.729-19.459,19.459s8.729,19.459,19.459,19.459S91.5,82.729,91.5,72  S82.771,52.541,72.042,52.541z M72.042,85.459c-7.421,0-13.459-6.037-13.459-13.459c0-7.421,6.038-13.459,13.459-13.459  S85.5,64.579,85.5,72C85.5,79.422,79.462,85.459,72.042,85.459z" />
        </svg>
      </ComponentWrapper> */}
<select className="dropDown" onClick={e => getStatesByCountryId(e.target.value)}  onChange={e => setCountry_id(e.target.value)}>
<option>Please select countries</option>
{country.map((data,index)=>
<option key={index} value={data.id}  >{data.name}</option>
)}
</select>
<select className="dropDown" onClick={e => getCitiesStatesId(e.target.value)} onChange={e => setState_id(e.target.value)}>
<option>pleae select state</option>
{state.map((data,index)=>
<option key={index} value={data.id} >{data.name}</option>
)}
</select>
<select className="dropDown" onChange={e => setCity_id(e.target.value)}>
<option>pleae select city</option>
{city.map((data,index)=>
<option key={index} value={data.id} >{data.name}</option>
)}
</select>
<select className="dropDown" onChange={e => setListing_id(e.target.value)}>
<option>pleae select property type</option>
{listing.map((data,index)=>
<option key={index} value={data.id} >{data.title}</option>
)}

</select>
      {/* <ComponentWrapper>
        <FaRegCalendar className="calendar" />
        <DateRangePickerBox
          item={calendarItem}
          startDateId="startDateId-id-home"
          endDateId="endDateId-id-home"
          updateSearchData={(setDateValue) => setSearchDate(setDateValue)}
          showClearDates={true}
          small={true}
          numberOfMonths={1}
        />
      </ComponentWrapper>

      <ComponentWrapper>
        <FaUserFriends className="user-friends" />
        <ViewWithPopup
          key={200}
          noView={true}
          className="room_guest"
          view={
            <Button type="default">
              <span>Room {roomGuest.room > 0 && `: ${roomGuest.room}`}</span>
              <span>-</span>
              <span>Guest{roomGuest.guest > 0 && `: ${roomGuest.guest}`}</span>
            </Button>
          }
          popup={
            <RoomGuestWrapper>
              <ItemWrapper>
                <strong>Room</strong>
                <InputIncDec
                  id="room"
                  increment={() => handleIncrement('room')}
                  decrement={() => handleDecrement('room')}
                  onChange={(e) => handleIncDecOnChnage(e, 'room')}
                  value={roomGuest.room}
                />
              </ItemWrapper>
              <ItemWrapper>
                <strong>Guest</strong>
                <InputIncDec
                  id="guest"
                  increment={() => handleIncrement('guest')}
                  decrement={() => handleDecrement('guest')}
                  onChange={(e) => handleIncDecOnChnage(e, 'guest')}
                  value={roomGuest.guest}
                />
              </ItemWrapper>
            </RoomGuestWrapper>
          }
        />
      </ComponentWrapper> */}

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        onClick={goToSearchPage}
      >
        Find Hotels
      </Button>
    </FormWrapper>
  );
};

export default withRouter(SearchForm);
