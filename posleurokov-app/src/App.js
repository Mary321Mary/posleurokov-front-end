import React from "react";
import { axiosAPI } from "./plugins/axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null
        };
    }
    render() {
        return (
            <div>
                <p>{this.state.name}</p>
                <p>{this.state.email}</p>
            </div>
        );
    }
    async componentDidMount() {
        let userData = await axiosAPI.getUser();
        userData = userData.results[0];
        const name = `${userData.name.first} ${userData.name.last}`;
        const email = userData.email;
        this.setState({
                ...this.state, ...{
                    name,
                    email
                }
        });
    }
}

export default App;
