import React from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import DrawOverlay from './containers/DrawOverlay';
import SpeakOverlay from './containers/SpeakOverlay';



class App extends React.Component
{ 

    constructor(props) { 
        super(props);
    }

    render ()
    {
        return ( 
            <div id='widget-chat' className="widget chat">
               <Router>
                    <Switch>
                        <Route exact path="/do/:name" component={DrawOverlay} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

ReactDom.render(<App/>, document.getElementById("app"));