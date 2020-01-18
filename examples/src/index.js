import React from 'react';
import ReactDom from 'react-dom';
import JSONPreviewer  from '../../src';


function App () {

    const testObject = {
    arrayOfData: [4,5,24,23,155,15,24,523,633,5],
    aString: 'A Bunch of Words',
    aNumber: 54345934543354534354,
    nestedObject:{text:'hello', moreText:'goodbye', testFunction:()=> { console.log('function log')}}
    }

    return(
        <div>
        <JSONPreviewer sourceObject={testObject} />
        </div>
    );
}

ReactDom.render(<App />, document.getElementById('root'));
