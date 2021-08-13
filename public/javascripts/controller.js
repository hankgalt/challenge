'use strict';

const e = React.createElement;

const fetchUsers = () => {
    return fetch('/users')
        .then(response => response.json())
        .then(data => {
            console.log('/users - data: ', data);
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
            console.log('/userItems - data: ', data);
            return Promise.resolve(data);
        }).catch(error => {
            console.error('/userItems - error: ', error);
            return Promise.reject(error)
        });
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetchUsers().then(result => {
            console.log("result: %o", result);
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
                    console.log("result: %o", result);
                    this.setState({ error: null, items: result })
                }).catch(error => {
                    console.error('fetchItems() - error: %o', error);
                    this.setState({ error: error.message, items: null })
                });
            }
        }
      }

    render() {
        console.log("render() - state: ", this.state);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6 col-md-4">
                        <h2>All Users</h2>
                    </div>
                </div>
            </div>
        );
    }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(e(App), domContainer);