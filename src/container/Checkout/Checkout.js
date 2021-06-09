import React, { Component,useState } from 'react'
import './Checkout.css';
import axios from 'axios'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
 
 
import { BraintreeHostedFields } from 'braintree-web-react'
 
import { BraintreeDropIn } from "braintree-web-react"
 
 
class Checkout extends Component {
	  state = {
		clientToken: null
	  }
	constructor(prop){
		super(prop);
		 axios.get('http://codestarc.com/client/newproject/api/maketoken')
		  .then(res => {
			  const clientToken = res.data.clientToken
			  this.setState({ clientToken });
		  }).catch(err => {
			console.log(err);
		  })	
	}
 
  instance;
 async componentDidMount() {
    try {
      // Get client token for authorization from your server
      const response = await axios.get('http://codestarc.com/client/newproject/api/maketoken')
      const clientToken =  response.data.clientToken
     
      this.setState({ clientToken })
    } catch (err) {
      console.error(err)
    }
  }
  
    async purchase() {   
     var  amount = localStorage.getItem("amount");
     var id =localStorage.getItem("data");
    const { nonce } = await this.instance.requestPaymentMethod();
    const response = await axios.post(
      'http://codestarc.com/client/newproject/api/payment',
      { paymentMethodNonce: nonce,amount : amount,id: id}
          )
          console.log(id,"===============");
  }
  
  async newpurchase() {
	  var   amount = localStorage.getItem("amount");
    var id = localStorage.getItem("data");
	 try {
      // Send nonce to your server
      const { nonce } = await this.instance.tokenize()
      const response = await axios.post(
         'http://codestarc.com/client/newproject/api/payment',
        { paymentMethodNonce: nonce , amount : amount ,id : id.id }
      )
      
    } catch (err) {
      console.error(err)
    }
  }
 
  render() {
 
   if (!this.state.clientToken) {
      return (

        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="braitreediv">
          <BraintreeDropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={instance => (this.instance = instance)}
			
          />
          <button id="btn" onClick={this.purchase.bind(this)}>Pay</button>
        </div>
      );
    
    }
  }
}
export default Checkout;

