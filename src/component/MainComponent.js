import {Component} from 'react'
import React from "react";

class MainComponent extends Component {

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <button style={{
                        width: "1rem",
                        height: "1rem",
                        margin: ".8rem",
                        boxShadow: ".2rem",
                        borderRadius: "1rem",
                        backgroundColor: "gray"
                    }} onClick={(e)=>this.props.addChild(e,this.props.item)}/>
                    <input
                        style={{
                            width: "8rem",
                            border: "none",
                            boxShadow: 0,
                            fontSize:"1rem",
                            color:"black",
                            borderBottom: "1px solid lightgray"
                        }}
                        defaultValue={this.props.item.title}
                        onChange={(e) => this.props.change(e, this.props.item)}
                        onKeyDown={(e) => this.props.callback(e, this.props.item,this.props.itemIndex)}
                        placeholder="write your text"/>
                </div>
                <div  style={{marginLeft:"2rem"}}>
                    {(this.props.details != null && this.props.details.length > 0) ?
                        this.props.details.map((it,index) => (
                            <MainComponent itemIndex={index} key={it.id} details={this.props.details.filter(et => et.parentId === it.id)}
                                           item={it} callback={this.props.callback} change={this.props.change}
                                           addChild={this.props.addChild}
                            />
                        ))
                        : null}
                </div>
            </div>
        );
    }

}

export default MainComponent