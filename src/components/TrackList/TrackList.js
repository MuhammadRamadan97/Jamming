import React from "react";
import { Track } from "../Track/Track";
import './TrackList.css'

export class TrackList extends React.Component {

    

    render() {
        

        
        return (
            <div className="TrackList">

                
                {this.props.tracks.map(track => <Track 
                                                        name={track.name}
                                                        artist={track.artist}
                                                        album={track.album}
                                                        key={track.id}
                                                        onAdd={this.props.onAdd}
                                                        track={track}
                                                        isRemoval={this.props.isRemoval}
                                                        onRemove={this.props.onRemove}/>)}

            
            </div>
        )
    }
}