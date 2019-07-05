class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
    }

    render() {
        return (<div className="InputForm">
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <h3>Login page</h3>
                <label className="inputEmail3">Email addres</label>
                <input className="form-control" type="email" name="name" placeholder="Enter email" />
                <label className="inputPassword3">Password</label>
                <input className="form-control" type="password" name="password" placeholder="Enter password" />
                <Link to="Registration">Registration</Link>
                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Send" />
            </form>
        </div>
        );
    }
}