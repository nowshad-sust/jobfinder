import React, { useState, useContext } from "react";
import queryString from "query-string";
import { Layout, Input, Select, Button, Typography } from "antd";
import {
	SearchOutlined,
	AuditOutlined,
	EnvironmentOutlined,
	DownSquareOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { store } from "../store/store";
import * as actions from "../store/actions";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const citiesArray = ["Berlin", "Munich", "Cologne", "Hamburg", "Dusseldorf"];
const companiesArray = ["Personio", "HelloFresh"];
const investorIds = [30, 25, 34];

const Filter = () => {
	const { state, dispatch } = useContext(store);
	const [keyword, setKeyword] = useState();
	const [cities, setCities] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [investors, setInvestors] = useState([]);

	// need to apply local state to update only on submit

	const url = queryString.stringifyUrl({
		url: "",
		query: {
			keyword,
			cities,
			companies,
			investors,
		},
	});

	const onSubmit = () => {
		dispatch(actions.setKeyword(keyword));
		dispatch(actions.setCities(cities));
		dispatch(actions.setCompanies(companies));
		dispatch(actions.setInvestors(investors));
	};

	return (
		<Sider
			size="large"
			width="30%"
			breakpoint="lg"
			theme="light"
			style={{
				padding: "0 20px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				marginTop: "50px",
				paddingTop: "25px",
			}}
		>
			<div className="logo" />
			<Input
				size="large"
				style={{ width: "100%", margin: "10px 0" }}
				defaultValue=""
				placeholder="Search jobs"
				suffix={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="City"
				defaultValue={[]}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(values) => setCities(values)}
			>
				{citiesArray.map((city, i) => (
					<Option key={i} value={city}>
						{city}
					</Option>
				))}
			</Select>

			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="Company"
				defaultValue={[]}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(values) => setCompanies(values)}
			>
				{companiesArray.map((company, i) => (
					<Option key={i} value={company}>
						{company}
					</Option>
				))}
			</Select>
			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="Investor"
				defaultValue={[]}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(values) => setInvestors(values)}
			>
				{investorIds.map((investor, i) => (
					<Option key={i} value={investor}>
						{investor}
					</Option>
				))}
			</Select>
			<Link type="primary" danger to={url}>
				<Button type="primary" onClick={onSubmit}>
					Search
				</Button>
			</Link>
			<Link danger to="" style={{ float: "right" }}>
				<Button type="default">Search</Button>
			</Link>
		</Sider>
	);
};

export default Filter;
