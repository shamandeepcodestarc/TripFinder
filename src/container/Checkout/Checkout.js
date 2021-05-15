import React, { Component,useState } from 'react'

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
    const { nonce } = await this.instance.requestPaymentMethod();
    console.log(nonce);
    debugger;
    const response = await axios.post(
      'http://codestarc.com/client/newproject/api/payment',
      { paymentMethodNonce: nonce}
    )
    console.log(response)
  }
  
  async newpurchase() {
	
	 try {
      // Send nonce to your server
        const { nonce } = await this.instance.tokenize()
 console.log(nonce);
 debugger;
      const response = await axios.post(
         'http://codestarc.com/client/newproject/api/payment',
        { paymentMethodNonce: nonce }
      )
 
      console.log(response)
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
        <div>
          <BraintreeDropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={instance => (this.instance = instance)}
			
          />
          <button onClick={this.purchase.bind(this)}>Submit</button>
        </div>
      );
    }
  }
}
export default Checkout;

