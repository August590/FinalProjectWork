import React, { Component } from 'react';

import Axios from 'axios';

class SignUp extends Component {

    state ={
        user:{
            firstName: '',
            lastName: '',
            age: '',
            telephone: '',
            email: '',
            password: ''
        }
    }

    submitHandler = (event) =>{
        event.preventDefault();
        

        Axios.post('http://localhost:8080/submitUserInfoDetails', this.state.user)
        .then(response =>{
            window.location.reload(false);
            this.props.history.push('/home');
        }).catch(error =>{
            alert('try another email');
            
            //console.log("this is happening");
        })
    }

    handleChange = (event) =>{
        const value = event.target.value;
        const name = event.target.name;
        const tempUser = {...this.state.user}
        tempUser[name] = value;
        this.setState
        (
            {
                user:tempUser
            }
        )
    }

    render() {
        return (
            <div>
                <form className='sign-up-form container' onSubmit={this.submitHandler}>
                <h2 className='container'>Sign Up</h2>
                <div class="">
                    <div class="mt-3">
                        <input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.firstName} name= "firstName" placeholder="First name" required/>
                    </div>
                    <div class="mt-3">
                    <   input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.lastName} name= "lastName" placeholder="Last name" required/>
                    </div>
                </div>
                <div class="">
                    <div class="mt-3">
                        <input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.age} name= "age" placeholder="Age" required/>
                    </div>
                    <div class="mt-3">
                        <input type="email" className="form-control" onChange={this.handleChange} value={this.state.user.email} name= "email" placeholder="Email" required/>
                    </div>
                </div>
                <div class="">
                    <div class="mt-3">
                        <input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.phone} name= "telephone" placeholder="Telephone" required/>
                    </div>
                    <div class="mt-3">
                        <input type="password" className="form-control" onChange={this.handleChange} value={this.state.user.password} name= "password" placeholder="Password" required/>
                    </div>
                </div>
                <div class="mt-2">
                    <button className="btn btn-outline-success" type="submit" name="signup">Sign up</button>
                </div>
                </form>
            </div>
        );
    }
}

export default SignUp;