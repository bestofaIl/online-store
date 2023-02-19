import React from "react";
import NavBar from "./components/ui/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Cart from "./layouts/cart";
import AppLoader from "./components/ui/hoc/appLoader";
import Products from "./components/ui/products";

const App = () => {
    return <>
        <AppLoader>
            <NavBar/>
            <Switch>
                <Route path="/product/:productId?" component={Products} />
                <Route path="/login" component={Login}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/" component={Main}/>
            </Switch>
        </AppLoader>
    </>;
};

export default App;
