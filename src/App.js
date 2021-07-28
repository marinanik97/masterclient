import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import CreateReport from "./pages/CreateReport";
import CreateType from "./pages/CreateType";
import LogIn from "./pages/LogIn";
import Card from "./pages/Card";
import DrawerFP from "./components/DrawerFP";
import AuthContext from "./contexts/auth/AuthContext";
import ReportList from "./pages/ReportList";
import CreateMedicalRecord from "./pages/CreateMedicalRecord";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apollo";
function App() {
  const { getToken } = AuthContext();

  const fetchData = () => {
    fetch("http://localhost:9000/tipovi")
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    fetchData();
  });

  //poslednja fja koja ce se pozvati
  // componentDidMount(){
  //   fetchData();
  // }

  return getToken ? (
    <ApolloProvider client={client}>
      <DrawerFP>
        <Route exact path="/reports" component={ReportList} />
        <Route exact path="/report" component={CreateReport} />
        <Route exact path="/types" component={CreateType} />
        <Route exact path="/card" component={Card} />
        <Route exact path="/cardCreate" component={CreateMedicalRecord} />
      </DrawerFP>
    </ApolloProvider>
  ) : (
    <LogIn />
  );

  //   return (
  //     <Router>
  //       <div>
  //         <Menu />
  //         {/* <nav>
  //           <ul>
  //             <li>
  //               <Link to="/">Home</Link>
  //             </li>
  //             <li>
  //               <Link to="/about">About</Link>
  //             </li>
  //             <li>
  //               <Link to="/users">Users</Link>
  //             </li>
  //           </ul>
  //         </nav> */}
  //
  //         <Switch>
  //         <Route path="/moja">
  //             <Moja />
  //           </Route>
  //           <Route path="/createtype">
  //             <CreateType />
  //           </Route>
  //           <Route path="/createreport">
  //             <CreateReport />
  //           </Route>
  //           <Route path="/logout">
  //             <LogOut />
  //           </Route>
  //           <Route path="/login">
  //             <LogIn />
  //           </Route>
  //           {/* <Route path="/card">
  //   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
  // </Route> */}
  //           <Route path="/card">
  //             <Card />
  //           </Route>
  //           <Route path="/">
  //             <Home />
  //           </Route>
  //         </Switch>
  //       </div>
  //     </Router>
  //   );
}

export default App;
