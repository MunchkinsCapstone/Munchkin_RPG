import React, { Component } from 'react'

class Room extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomName: '',
            users: [],
            status: false
        }
    }
    render() {
        return (
            <div>
                <h1>ROOM</h1>

                <button>JOIN</button>

                <button>START GAME</button>
            </div>
        )
    }
}

export default Room;