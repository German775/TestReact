import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link, Switch, BrowserRouter, NavLink } from 'react-router-dom';
import './App.css';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/Login" component={Login} />
                    <Route path="/Registration" component={Registration} />
                    <Route path="/Item1" component={Item1} />
                    <Route path="/Item2" component={Item2} />
                    <Route path="/Item3" component={Item3} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        return <Redirect to='/Menu' />;
    }

    render() {
        return (<div className="InputForm">
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <h3>Registration page</h3>
                <label className="inputEmail3">Email addres</label>
                <input className="form-control" type="email" name="name" placeholder="Enter email" />
                <label className="inputPassword3">Password</label>
                <input className="form-control" type="password" name="password" placeholder="Enter password" />
                <label className="inputPassword3">Reenter password</label>
                <input className="form-control" type="password" name="reiterationPassword" placeholder="Enter password" />
                <br />
                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Send" />
            </form>
        </div>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        sessionStorage.setItem("token", "123")
        console.log("get token for session");
        var token = sessionStorage.getItem("token");
        console.log(token);
    }

    render() {
        return (<div className="InputForm">
            <form className="form-horizontal">
                <h3>Login page</h3>
                <label className="inputEmail3">Email addres</label>
                <input className="form-control" type="email" name="name" placeholder="Enter email" />
                <label className="inputPassword3">Password</label>
                <input className="form-control" type="password" name="password" placeholder="Enter password" />
                <Link to="Registration">Registration</Link>
                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Send" onClick={this.handleSubmit} />
            </form>
        </div>
        );
    }
}

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }
    
    componentWillMount() {
        var token = sessionStorage.getItem("token");
        if (token == "123") {
            this.setState({ showModal: false });
        }
    }

    render() {
       const modal = this.state.showModal ? (
                <Modal>
                    <div className="modal">
                        <Login />
                    </div>
                </Modal>
            ) : null;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink to="/Item1" className="navbar-brand">
                        Item1
                </NavLink>
                    <NavLink to="/Item2" className="navbar-brand">
                        Item2
                </NavLink>
                    <NavLink to="/Item3" className="navbar-brand">
                        Item3
                </NavLink>
                </nav>
                {modal}
            </div>
        );
    }
}

const PageTemplate = ({ children }) =>
    <div className="page">
        <MainMenu />
        {children}
    </div>

export const Item1 = () =>
    <PageTemplate>
        <section className="">
            <h1>Item1</h1>
        </section>
    </PageTemplate>

export const Item2 = () =>
    <PageTemplate>
        <section className="">
            <h1>Item2</h1>
        </section>
    </PageTemplate>

export const Item3 = () =>
    <PageTemplate>
        <section className="">
            <h1>Item3</h1>
        </section>
    </PageTemplate>


const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

class NotFound extends React.Component {
    render() {
        return (<div className="NotFound">
            <h1>Resource not found</h1>
        </div>
        );
    }
}