import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/current-user/current-user.context';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null; 
  
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){/*if user signed in*/
        const userRef = await createUserProfileDocument(userAuth);
        /*we will get user object if he have object in database*/
        userRef.onSnapshot(snapShot =>{/*to get snapshot object(data of user) from that reference*/ 
           
          this.setState({currentUser:{
            id: snapShot.id,
            ...snapShot.data()
          }});/*this function like setState*/
        });
      }
      else{/*if user log out set currentUser to null*/ 
        this.setState({currentUser:userAuth});
      }
      /*addCollectionAndDocuments('collections',collectionsArray.map(({title,items}) =>
      ({title,items})))
      });*//*we just fire it once to enter shop data*/
    } 
  )}

  /*we have to close subscription when unmount because we don't want memory leaks in our js app
  related to listeners still being open even if the component that cares about the listener is no longer on the page*/
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    const {currentUser} = this.state;
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
        {/*used with dynamic state*/}
        <Header />
        </CurrentUserContext.Provider>
        {/*header out of the switch because we want it to display in all pages*/}
        {/*we pass currentUser to make header aware of user sign in or sign out*/}
        {/*The exact param disables the partial matching for a route and makes sure
         that it only returns the route if the path is an EXACT match to the current url*/}
        <Switch>{/*it allows for nested routes to work properly*/} 
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />

        <Route exact path='/signin' render={() =>
           currentUser ? 
           (<Redirect to='/' />):
           (<SignInAndSignUpPage/>)
           }
           />
        {/*render is js invocation that determines what component to return
         so it's in the same place of component but instead it will be some js*/}
        </Switch>
      </div>
    );
  }
}

export default App;