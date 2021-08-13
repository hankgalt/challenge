'use strict';

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
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