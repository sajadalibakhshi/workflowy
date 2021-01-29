import React from 'react'

import { initDB } from 'react-indexed-db';
import {DBConfig} from "../db/DBConfig";
import {IndexedDB} from "react-indexed-db";
import DetailPage from "./DetailPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
initDB(DBConfig);

function MainPage() {
    return(
        <IndexedDB
            name="SJDB2"
            version={1}
            objectStoresMeta={[
                {
                    store: 'item',
                    storeConfig: { keyPath: 'id', autoIncrement: true },
                    storeSchema: [
                        { name: 'title', keypath: 'title', options: { unique: false } },
                        { name: 'parentId', keypath: 'parentId', options: { unique: false } },
                        { name: 'date', keypath: 'date', options: { unique: false } },
                        { name: 'index', keypath: 'index', options: { unique: false } }
                    ]
                }
            ]}>
            <Router>
                <Route exact path="/" component={DetailPage}/>
            </Router>
        </IndexedDB>
    );
}
export default MainPage