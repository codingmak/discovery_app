import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = { description: '' };
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        fetch(this.props.formAction, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: this.state.description})
        });

        this.setState({description: ''});
    }
  render() {
    return (
      <div className="App">
      
          <p>
          Test = {window.token}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
           
          </a>
    <form class="container">
        <div class="row">
            <div class="col-md-5">
                <h1>Template</h1>
               <textarea id="template"></textarea>
            </div>
            <div class="col-md-5">
                <h1>Render</h1>
                <div id="render"></div>
      
            </div>
            <div class="col-md-2">
                <h1>Settings</h1>
                <div id="settings">
                    <label><input type="checkbox" name="showwhitespaces" checked="checked" /> Show whitespaces</label><br/>
                     <label><input type="checkbox" name="dummyvalues" /> Use dummy values</label>
                    <h1> JSON</h1>
                  
                    <input type="button" class="btn btn-success" id="convert" value="Convert" />
                    <input type="button" class="btn btn-danger" id="clear" value="Clear" />
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col-md-5">
                <h1>Values</h1>
                <textarea id="values"></textarea>
            </div>
            <div class="col-md-7">
                <h1>Custom Filters</h1>
            
            </div>
        </div>
       
    </form>

      </div>
    );
  }
}

