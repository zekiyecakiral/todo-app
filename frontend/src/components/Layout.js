import React from 'react';
import MainNavigation from "./MainNavigation";
// import Nav from "./Nav";

function Layout(props) {
    return (
        <div>
            <div >
                <MainNavigation history={props.history}/>
                <div>
                    {/* <Nav/> */}
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
