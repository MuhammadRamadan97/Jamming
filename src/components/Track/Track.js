import React from "react";
import './Track.css'

export class Track extends React.Component {

    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
  
    addTrack(){
        this.props.onAdd(this.props.track);
        
        
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
        
    }
    renderAction() {
        if(this.props.isRemoval){
            return (<button className="Track-action" onClick={this.removeTrack} isRemoval={this.props.isRemoval}>-</button>)
        }else{
            return (<button className="Track-action" onClick={this.addTrack} isRemoval={this.props.isRemoval}>+</button>)
        }
    }
    render() {
        
        return (
            <div className="Track">
                <div className="Track-information">
                <h3>{this.props.name}</h3>
                <p>{this.props.artist} | {this.props.album} </p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        )
    }
}