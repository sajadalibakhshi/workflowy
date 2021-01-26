import {useIndexedDB} from "react-indexed-db";
import React, {useEffect, useState} from "react";
import MainComponent from "./MainComponent";

function DetailPage() {
    const {getAll, add, update, deleteRecord} = useIndexedDB('item');
    const [items, setItems] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);
    const handleKeyPress = (event, item, index) => {
        if (event.key.toLowerCase() === "tab") {
            event.preventDefault();
        }
        if (event.key.toLowerCase() === "delete" && event.ctrlKey && event.shiftKey) {
            event.preventDefault();
            deleteRecord(item.id).then(
                event => {
                    console.log('ID Deleted: ', event.target);
                    setUpdateCount(updateCount + 1);
                },
                error => {
                    console.log(error);
                }
            )
        }
        if (event.key.toLowerCase() === 'enter') {
            console.log('enter press here! ' + event.key + "  id=" + item.id);
            addItem("", item.index, item.date + 100, item.parentId);
        }
        if (event.key.toLowerCase() === 'tab' && event.shiftKey) {
            handleShiftToParent(item);
        } else if (event.key.toLowerCase() === 'tab') {
            handleShiftToChild(item, index);
        }
    }

    const handleChangeInput = (e, item) => {
        console.log("change=" + e.target.value + "  =" + item.id + " index=" + item.index)
        update({
            id: item.id,
            title: e.target.value,
            index: item.index,
            parentId: item.parentId,
            date: item.date
        }).then(event => {
            console.log("editedItemid" + item.id);
            setUpdateCount(updateCount + 1);
        });
    }
    const handleShiftToParent = (item) => {
        update({
            id: item.id,
            title: item.title,
            index: item.index,
            parentId: 0,
            date: item.date
        }).then(event => {
            setUpdateCount(updateCount + 1);
        });
    }
    const handleShiftToChild = (item, index) => {
        update({
            id: item.id,
            title: item.title,
            index: item.index,
            parentId: index === 0 ? 0 : items[index - 1].id,
            date: item.date
        }).then(event => {
            setUpdateCount(updateCount + 1);
        });
    }
    const handleAddChild = (e, item) => {
        add({title: "", index: item.index, parentId: item.id, date: item.date + 1}).then(
            event => {
                console.log('child ID Generated: ', event.target);
                setUpdateCount(updateCount + 1);
            },
            error => {
                console.log(error);
            }
        );
    }

    const addItem = (title, pos, date, parentId) => {
        console.log("pos=" + pos)
        add({title: title, index: pos, parentId: parentId, date: date}).then(
            event => {
                console.log('ID Generated: ', event.target);
                setUpdateCount(updateCount + 1);
            },
            error => {
                console.log(error);
            }
        );
    };
    useEffect(() => {
        getAll().then(itemsFromDB => {
            console.log(itemsFromDB);
            setItems(itemsFromDB);
        }).catch((err) => console.log(err));
    }, [updateCount]);

    return (
        <div>
            {(items != null && items.length > 0) ?
                items.filter(et => et.parentId === 0).sort(function (a, b) {
                        // console.log("a=" + a.index + "b=" + b.index)
                        if (a.index > b.index) {
                            return 1;
                        } else if (a.index < b.index) {
                            return -1;
                        } else if (a.index === b.index) {
                            if (a.date > b.date) {
                                return 1;
                            } else {
                                return -1;
                            }
                        } else {
                            return 0;
                        }
                    }
                ).map((it, index) => (
                    <MainComponent itemIndex={index} key={it.id} details={items.filter(et => et.parentId === it.id)}
                                   item={it}
                                   callback={handleKeyPress} change={handleChangeInput}
                                   addChild={handleAddChild}
                    />
                ))
                :
                null}
            <button onClick={() => {
                if (items.length > 0) {
                    addItem("", (items[items.length - 1].index + 1), new Date().getTime(), 0);
                } else {
                    addItem("", 1, new Date().getTime(), 0);
                }
            }}
                    style={{
                        margin: "1rem",
                        border:"white",
                        borderColor: "white",
                        backgroundColor: "white",
                        borderRadius: "1.5rem",
                        width: "3rem",
                        height: "3rem",
                        fontSize: "3rem",
                        color: "black"
                    }}>+
            </button>
        </div>
    );
}

export default DetailPage