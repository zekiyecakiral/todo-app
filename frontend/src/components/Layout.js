import React from 'react';
import MainNavigation from "./MainNavigation";
// import Nav from "./Nav";

function Layout(props) {
    return (
        <div>
            <div style={{display: "flex"}}>
                <MainNavigation history={props.history}/>
                <div style={{maxWidth: '800px'}}>
                    {/* <Nav/> */}
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
