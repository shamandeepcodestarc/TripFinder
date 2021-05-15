import React ,{ useState } from 'react';
import './Cart.css';
import $ from 'jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import Checkout from "./components/Checkout";

const store = createStore(() => ({
  birds: [
    {
      name: 'robin',
      views: 1
    }
  ]
}));

$(document).ready(function () {
  recalculateCart();
  var jsonPrser = JSON.parse(localStorage.getItem('myproperty'));
    console.log(store);     
});

$('.like-btn').on('click', function () {
  $(this).toggleClass('is-active');
});


$(document).on('click', '.minus-btn', function (e) {
  e.preventDefault();
  var $this = $(this);
  var $input = $this.closest('div').find('input');
  var value = parseInt($input.val());

  if (value > 1) {
    value = value - 1;
  } else {
    value = 0;
  }

  $input.val(value);
  var parent_final = $(this).parent('.quantity').next().next('.total-price');
  var parent = $(this).parent('.quantity').next('.mysingle_price');
  var myprice = parent.val();
  var mytotal = parseFloat(myprice) * value
  console.log(mytotal);
  parent_final.html(mytotal);
  var parent_final = $(this).parent('.quantity').next().next('.total-price');
  var parent = $(this).parent('.quantity').next('.mysingle_price');
  var myprice = parent.val();
  var mytotal = parseFloat(myprice) * value
  console.log(mytotal);
  parent_final.html(mytotal)
  recalculateCart();
});


$(document).on('click', '.plus-btn', function (e) {
  e.preventDefault();
  console.log('gggg');
  var $this = $(this);
  var $input = $this.closest('div').find('input');
  var value = parseInt($input.val());
  if (value < 100) {
    value = value + 1;
  } else {
    value = 100;
  }

  $input.val(value);

  var parent_final = $(this).parent('.quantity').next().next('.total-price');
  var parent = $(this).parent('.quantity').next('.mysingle_price');
  var myprice = parent.val();
  var mytotal = parseFloat(myprice) * value
  console.log(mytotal);
  parent_final.html(mytotal);
  recalculateCart();
});

function recalculateCart() {
  var subtotal = 0;
  $('.item').each(function () {
    subtotal += parseFloat($(this).children('.total-price').text());
  });
  $('#cart-total').html(subtotal);
  $('#cart-subtotal').html(subtotal);
}



const Cart = () => {
	
  var jsonPrser = JSON.parse(localStorage.getItem('myproperty'));
  console.log(jsonPrser.data, 'sss');
   const mystyle = {
      padding: "10px",
	  marginLeft:"50px",
      fontFamily: "Arial"
    };
	const imagecss ={
		width:"100px",
		height:"200px",
		radius:'20px'
	};
	const h2test={
		color:"red",
        marginLeft:"500px",
		marginTop:"200px"
		}
	if(jsonPrser != null){
  return (
    <div>
      <div className="shopping-cart">

        <div className="title" style={mystyle}>

          <h2>Items In Your Shopping Bag</h2>
  </div>
        {/* jsonPrser.data */}
        <div className="row">
          <div className="col-md-8">
		  {jsonPrser.map((property, index) =>				
              <div className="item" key={index}>
                <div className="buttons">
                </div>
			<div className="image" style={imagecss}>
                  <img src="http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-14_thumb.jpg" alt="" />
                </div>
                <div className="description">
                  <span>{property.title}</span>
                  <span>{property.property_name}</span>
                  <span>{property.property_type}</span>
                </div>
			      
                <div className="quantity">
                  <button className="minus-btn" type="button" name="button">
                    <span className="incre_opr">-</span>
                  </button>
                  <input type="text" className="qty-input form-control" maxLength="2" max="10" defaultValue="1" />
                  <button className="plus-btn" type="button" name="button">
                    <span className="incre_opr">+</span>
                  </button>

                </div>
                <input type="hidden" className="mysingle_price" defaultValue={property.pricing} />
                <span>Price</span>
				<div className="total-price">{property.pricing}</div>
                  
              </div>
            )}
		  
          </div>
          <div className="col-md-4">
            <div className="totals">
              <div className="totals-item">
                <label>Subtotal :</label>
                <div className="totals-value" id="cart-subtotal">0</div>
              </div>

              <div className="totals-item totals-item-total">
                <label>Grand Total :</label>
                <div className="totals-value" id="cart-total">0</div>
              </div>
              <a href="/Checkout"><button className="checkout" >Checkout</button></a>
            </div>


          </div>
        </div>
      </div>


    </div>
	
	)}else{
		
	return(
	<>
	<h2 style={h2test}>Pleace select any cart.. </h2>
	</>
	)
	}	
	}
  
   

   
export default Cart;
