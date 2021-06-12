import React,{useState} from 'react';
import axios from 'axios';
import { Label } from 'container/Auth/Auth.style';

const Description = ()=>{
  const [PropertyData, setPropertyData] = useState([]);
    let token = localStorage.getItem("key");
    var token1 = token.replace(/"/g, "");
    console.log(token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token1}`
      }
    };
    var str = window.location.href;
    var id = str.split("/").pop();
    axios.get(`http://codestarc.com/client/newproject/api/properties/${id}`, config).then((response) => {
      let dataJson = JSON.stringify(response);
      let jsonPrser = JSON.parse(dataJson);
      if (jsonPrser.status == 200) {
        setPropertyData(jsonPrser.data.data);
      }
    }).catch((error) => {
      console.log(error, 'errror');

    }); 
   
 return(
   <>
   <div>
      <Label>Name:</Label><Label>{PropertyData.property_name}</Label><br/>
      <Label>location:</Label><Label>{PropertyData.location}</Label><br/>
      <Label>Price:</Label><Label>{PropertyData.pricing}</Label><br/>
      <Label>Title:</Label><Label>{PropertyData.title}</Label><br/>
      <Label>Totle Rooms:</Label><Label>{PropertyData.total_rooms}</Label><br/>
      <Label>Floor:</Label><Label>{PropertyData.floor}</Label><br/>
      <Label>Description:</Label><Label>{PropertyData.description}</Label><br/>
      <br/>
  </div>
  </>
 )
};

export default Description;
