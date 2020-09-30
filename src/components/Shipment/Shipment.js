import React from 'react';
import { useForm } from 'react-hook-form';
import "./Shipment.css"
import { useContext } from 'react';
import { UserContext } from '../../App';
const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  const [loggedInUser, setLoggedInUser]= useContext(UserContext)
  console.log(watch("example")); 
  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
       
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="your name"/>
    
      {errors.name && <span className="error">Named is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="your email"/>
    
      {errors.email && <span className="error">email is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="your address"/>
    
      {errors.address && <span className="error">Address is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="your phone number "/>
    
      {errors.phone && <span className="error">Phone number is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;
