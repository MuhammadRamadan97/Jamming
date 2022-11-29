import React from "react";
import { TrackList } from "../TrackList/TrackList";

import './Playlist.css'

export class Playlist extends React.Component {

    constructor(props){
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleChangeName(e){
        this.props.onNameChange(e.target.value)
    }
    render() {

        return(
            <div className="Playlist">
                <input defaultValue={"New Playlist"} onChange={this.handleChangeName}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}