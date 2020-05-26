import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "./apollo";
import { StateProvider } from "./store/store";
import Nav from "./components/Nav";
import Filter from "./components/Filter";
import JobList from "./components/JobList";

import "./App.css";

function App() {
	return (
		<StateProvider>
			<ApolloProvider client={ApolloClient}>
				<div className="App">
					<Layout
						className="main-layout"
						style={{ width: "100%", height: "100%" }}
					>
						<Router>
							<Nav />
							<Layout width="100%">
								<Filter />
								<Layout.Content style={{ width: "100%", marginTop: "50px" }}>
									<div
										className="site-layout-background"
										style={{ padding: 24, minHeight: 360, width: "100%" }}
									>
										<JobList />
									</div>
								</Layout.Content>
							</Layout>
						</Router>
					</Layout>
				</div>
			</ApolloProvider>
		</StateProvider>
	);
}

export default App;
