import React, { Component } from 'react';
import AccountAvatar from '../accountavatar/AccountAvatar';

class AccountForm extends Component {

    state ={
        user :{
            firstName: '',
            lastName: '',
            age: '',
            telephone: '',
            email: '',
            password: ''
        }
    }

    submitHandler = (event) =>{

    }

    handleChange = (event) =>{

    }
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <form className='edit-info-form ' onSubmit = {this.submitHandler}>
                <div class="">
                    <div class="mt-4">
                        <input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.firstName} name= "firstName" placeholder="First name"/>
                    </div>
                    <div class="mt-4">
                    <   input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.lastName} name= "lastName" placeholder="Last name"/>
                    </div>
                </div>
                <div class="">
                    <div class="mt-4">
                        <input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.age} name= "age" placeholder="Age"/>
                    </div>
                    <div class="mt-4">
                        <input type="email" className="form-control" onChange={this.handleChange} value={this.state.user.email} name= "email" placeholder="Email"/>
                    </div>
                </div>
                <div class="">
                    <div class="mt-4">
                        <input type="text" className="form-control" onChange={this.handleChange} value={this.state.user.phone} name= "phone" placeholder="Telephone"/>
                    </div>
                    <div class="mt-4">
                        <input type="password" className="form-control" onChange={this.handleChange} value={this.state.user.password} name= "password" placeholder="Password"/>
                    </div>
                </div>
                </form>
            </div>
        );
    }
}

export default AccountForm;