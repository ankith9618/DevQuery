import React from 'react';
import './QueryDetails.css';

import SelectedQuery from './SelectedQuery.js';


export default function QueryDetails({ query, setSelectedQuery,queries,setQueries ,setSearchQuery}) {
    return (
        <>
            <SelectedQuery
                query={query}
                setSelectedQuery={setSelectedQuery}
                queries={queries}
                setQueries={setQueries}
                setSearchQuery={setSearchQuery}
            />
        </>
    );
}
