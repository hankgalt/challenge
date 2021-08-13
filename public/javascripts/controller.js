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