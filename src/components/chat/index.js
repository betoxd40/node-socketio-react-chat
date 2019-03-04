import React, { Component } from "react";
import io from "socket.io-client";

class Chat extends Component {
    state = {
        username: '',
        message: '',
        messages: []
    };
    constructor(props) {
        super(props);
        this.socket = io('localhost:8080');
        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });
        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
        };
    }
    sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        });
        this.setState({ message: '' });
    }
    render() {
        const {
            username,
            message,
            messages
        } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr />
                                <div className="messages">
                                    {messages.map( message =>
                                        <div>{message.author}: {message.message}</div>
                                    )}
                                </div>
                                <div className="footer">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={ev => this.setState({ username: ev.target.value })}
                                        className="form-control" />
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Message"
                                        className="form-control"
                                        value={message}
                                        onChange={ev => this.setState({ message: ev.target.value })} />
                                    <br />
                                    <button
                                        onClick={this.sendMessage}
                                        className="btn btn-primary form-control">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;