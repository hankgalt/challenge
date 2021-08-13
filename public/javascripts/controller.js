'use strict';

const e = React.createElement;

const fetchUsers = () => {
    return fetch('/users')
        .then(response => response.json())
        .then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            console.error('/users - error: ', error);
            return Promise.reject(error)
        });
}

const fetchItems = (users) => {
    const url = '/userItems?' + new URLSearchParams({ users })
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            console.error('/userItems - error: ', error);
            return Promise.reject(error)
        });
}

const fetchDemographics = (item) => {
    const url = '/users/age?' + new URLSearchParams({ item })
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            console.error('/users/age - error: ', error);
            return Promise.reject(error)
        });
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.renderUsers = this.renderUsers.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.renderDemographics = this.renderDemographics.bind(this);
    }

    componentDidMount() {
        fetchUsers().then(result => {
            this.setState({ error: null, users: result })
        }).catch(error => {
            console.error('/users - error: %o', error);
            this.setState({ error: error.message, users: null })
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        if (snapshot !== null) {
            if (this.state.users && this.state.users.length > 0 && !this.state.items) {
                const unames = [];
                for (const [key, value] of Object.entries(this.state.users)) {
                    unames.push(value.username)
                }
                fetchItems(unames).then(result => {
                    this.setState({ error: null, items: result })
                }).catch(error => {
                    console.error('fetchItems() - error: %o', error);
                    this.setState({ error: error.message, items: null })
                });
            }
        }
    }

    itemSelected(event) {
        const selected = event.target.value;

        fetchDemographics(selected).then(result => {
            this.setState({ selected, demographics: result })
        }).catch(error => {
            console.error('fetchDemographics() - error: %o', error);
            this.setState({ error: error.message, items: null })
        });
    }

    renderUsers() {
        if (!this.state.users) {
            return(
                <div className="col-xs-6 col-md-4">
                    <table className="table table-striped">
                        <thead>
                            <th>UserName</th>
                            <th>Age</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            );
        }

        const rows = [];
        this.state.users.forEach((user, idx) => rows.push(
            <tr key={`${idx}-${user.username}`}><td>{user.username}</td><td>{user.age}</td></tr>
        ))
        return(
            <div className="col-xs-6 col-md-4">
                <table className="table table-striped">
                    <thead>
                        <th>UserName</th>
                        <th>Age</th>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

    renderItems() {
        if (!this.state.items) {
            return(
                <div className="col-xs-2 col-md-2">
                    <select className="form-control">
                        <option disabled hidden selected>Select One</option>
                    </select>
                </div>
            );
        }

        const options = [];
        this.state.items.forEach((item, idx) => options.push(
            <option key={`${idx}-${item}`}>{item}</option>
        ));
        return(
            <div className="col-xs-2 col-md-2">
                <select className="form-control" onChange={this.itemSelected}>
                    <option disabled hidden selected>Select One</option>
                    {options}
                </select>
            </div>
        );
    }

    renderDemographics() {
        if (!this.state.demographics) {
            return(
                <div className="col-xs-6 col-md-4">
                    <table className="table table-striped">
                        <thead>
                            <th>Age</th>
                            <th>Count</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            );
        }

        const rows = [];
        Object.keys(this.state.demographics).forEach(key => rows.push(
            <tr key={`${key}`}><td>{key}</td><td>{this.state.demographics[key]}</td></tr>
        ))
        return(
            <div className="col-xs-6 col-md-4">
                <table className="table table-striped">
                    <thead>
                        <th>Age</th>
                        <th>Count</th>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6 col-md-4">
                        <h2>All Users</h2>
                    </div>
                </div>
                <div className="row">
                    {this.renderUsers()}
                </div>
                <div className="row">
                    <div className="col-xs-6 col-md-4">
                        <h2>Age Demographic of users with </h2>
                    </div>
                </div>
                <div className="row">
                    {this.renderItems()}
                </div>
                <div id="userDemographic" className="row">
                    {this.renderDemographics()}
                </div>
            </div>
        );
    }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(e(App), domContainer);