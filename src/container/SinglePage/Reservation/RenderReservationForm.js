import React, { useState } from 'react';
import { Button } from 'antd';
import HtmlLabel from 'components/UI/HtmlLabel/HtmlLabel';
import DatePickerRange from 'components/UI/DatePicker/ReactDates';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import $ from 'jquery';
import ReservationFormWrapper, {
  FormActionArea,
  FieldWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Reservation.style.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const RenderReservationForm = () => {
  const [formState, setFormState] = useState({
    startDate: null,
    endDate: null,
    room: 0,
    guest: 0,
  });

  var str = window.location.href;
  var array = str.split("/").pop();

  const handleIncrement = (type) => {
    setFormState({
      ...formState,
      [type]: formState[type] + 1,
    });
  };
  const handleDecrement = (type) => {
    if (formState[type] <= 0) {
      return false;
    }
    setFormState({
      ...formState,
      [type]: formState[type] - 1,
    });
  };
  const handleIncDecOnChnage = (e, type) => {
    let currentValue = e.target.value;
    setFormState({
      ...formState,
      [type]: currentValue,
    });
  };
  const updateSearchDataFunc = (value) => {
    setFormState({
      ...formState,
      startDate: value.setStartDate,
      endDate: value.setEndDate,
    });
  };
  const handleSubmit = (e) => {
	 const task1 = localStorage.setItem('startDate',`${formState.startDate}`);           
	 const task2 = localStorage.setItem('endDate',`${formState.endDate}`);           
	 const task3 = localStorage.setItem('roomcout',`${formState.room}`);           
	 const task4 = localStorage.setItem('gestcout',`${formState.guest}`);           
    e.preventDefault();
	   
	if(localStorage.getItem('itemsincart') != null) {
	var count = localStorage.getItem('itemsincart');
	$("#lblCartCount").html(count);
	}else{
	var count = 0 ;
}
	  e.preventDefault();
      var hotelid = array;
      const task = localStorage.getItem('setproperty');            
      count++;
   
	  $.ajax({ url: 'http://codestarc.com/client/newproject/api/getpropertybyid/'+ hotelid,
          type: 'get',
          success: function(data) {
           var resdata = data.data;
           $("#lblCartCount").html(count);
           localStorage.setItem('itemsincart', +count);
           var local = localStorage.getItem('setproperty');
           if(local){
             var arr2= JSON.parse(local);
             var jsonArray1 = arr2.concat(data.data);
             localStorage.setItem('setproperty', JSON.stringify(jsonArray1));
             var local_1 = localStorage.getItem('setproperty');
           } else{
             localStorage.setItem('setproperty', JSON.stringify(resdata));
           }
     }
});
  };
   
  return (
  
    <ReservationFormWrapper className="form-container" onSubmit={handleSubmit}>
      <FieldWrapper>
        <HtmlLabel htmlFor="dates" content="Dates" />
        <DatePickerRange
          startDateId="checkin-Id"
          endDateId="checkout-id"
          startDatePlaceholderText="Check In"
          endDatePlaceholderText="Check Out"
          updateSearchData={(value) => updateSearchDataFunc(value)}
          numberOfMonths={1}
          small
        />
      </FieldWrapper>
      <FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Guests" />
        <ViewWithPopup
          key={200}
          noView={true}
          className={formState.room || formState.guest ? 'activated' : ''}
          view={
            <Button type="default">
              <span>Room {formState.room > 0 && `: ${formState.room}`}</span>
              <span>-</span>
              <span>Guest{formState.guest > 0 && `: ${formState.guest}`}</span>
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
                  value={formState.room}
                />
              </ItemWrapper>

              <ItemWrapper>
                <strong>Guest</strong>
                <InputIncDec
                  id="guest"
                  increment={() => handleIncrement('guest')}
                  decrement={() => handleDecrement('guest')}
                  onChange={(e) => handleIncDecOnChnage(e, 'guest')}
                  value={formState.guest}
                />
              </ItemWrapper>
            </RoomGuestWrapper>
          }
        />
      </FieldWrapper>
      <FormActionArea>
	  
        <Button htmlType="submit" data-id ={array} type="primary">
          Book Hotel
        </Button>
      </FormActionArea>
    </ReservationFormWrapper>
  );
};

export default RenderReservationForm;
