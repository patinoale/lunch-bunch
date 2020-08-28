import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventsService from '../../utils/eventsService'
import './SubmitOrderForm.css';
import SubmitOrderTally from '../SubmitOrderTally/SubmitOrderTally';

class SubmitOrderForm extends Component {
    constructor(props){
        super(props)
        this.state= {
            name: "",
            location: "",
            restaurant: 0,
            menuItem: 0,
            guestOrders: [],
            shops: [
                {
                    name: "Chipotle",
                    items: ["Burrito","Bowl","Quesadillas"]

                }, {
                    name: "Jimmy Johns",
                    items: ["The Pepe","Big John","Totally Tuna", "Turkey Tom", "Vito", "The Veggie"]
                }, {
                    name: "Panda Express",
                    items: ["Orange Chicken","Honey Sesame Chicken","String Bean Chicken",
                     "Sweet Fire Chicken", "Black Pepper Angus Steak", "Mushroom Chicken",
                    "Black Pepper Chicken", "Grilled Teriyaki Chicken", "Chow Mein", "Fried Rice",
                    "Steamed Rice"] 
                }, {
                    name: "",
                    items: []
                }

            ],
        }
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            //[Quick & Dirty], take stringified object and parse it back into object 
          [e.target.name]: JSON.parse(e.target.value)
        });
      }

      handleClick = (e) => {
        let newOrder = {
            guestId : this.state.guest._id,
            restaurant : this.state.shops[this.state.restaurant].name,
            menuItem : this.state.shops[this.state.restaurant].items[this.state.items]
        }
        const currentOrders = this.state.guestOrders.concat(newOrder);
        this.setState({ guestOrders : currentOrders })

          
      }

      handleSubmit = async(event) => {
        console.log('A name was submitted: ' + this.state.name);
        event.preventDefault();
        try {
            console.log("attempting to update")
            await EventsService.updateEvent(this.props._id, this.state.guest.name, {
                "guests" : this.state.guestOrders
                
            });
        } catch(err) {
            console.log(err)
        }
        //this.props.history.push('/dashboard');
      } 

      
    render() {
        return (
            <div className="order-form">
            <SubmitOrderTally
                guestOrders={this.state.guestOrders}
            />
            <div>
                {this.props.name}<br></br>
                <label className="select-order">Select Guest:</label>
                <select name="guest" onChange={this.handleChange}>
                {(this.props.guests || [{name: ""}]).map((guest, idx) =>
                <option value={JSON.stringify(guest)}> {guest.name} </option> 
                )}
                </select>
            <table>

                <>
                <tr>
                    <td>{this.state.name}</td>
                    <td>
                        <select name="restaurant" onChange={this.handleChange}>
                        {this.state.shops.map((shop, idx) =>
                            <option value={idx}> {shop.name} </option> 
                            )}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>{this.state.location}</td>
                    <td>
                        <select name="menuItem" >
                        {this.state.shops[this.state.restaurant].items.map((item, idx) =>
                            <option value={idx}> {idx} </option> 
                            )}
                        </select>
                    </td>
                </tr>
                <tr>
                    <button name="guestOrder" onClick={this.handleClick}>Add Guest Order</button>
                </tr>
               </>
            </table>
            <Link to="order-confirmation" className='NavBar-link' onClick={this.handleSubmit}>
            <button>
            
            Submit Order
            </button>
        </Link>
        </div>
        </div>

        )
    }
}

export default SubmitOrderForm;