import React from "react";
import { Layout, Input, Select, Button, Typography } from "antd";
import {
	SearchOutlined,
	AuditOutlined,
	EnvironmentOutlined,
	DownSquareOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const cities = ["Berlin", "Munich", "Cologne", "Hamburg", "Dusseldorf"];

const Filter = () => {
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
			/>
			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="City"
				defaultValue={[]}
				onChange={() => console.log("changed")}
				showSearch
				filterOption={false}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
			>
				{cities.map((city, i) => (
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
				onChange={() => console.log("changed")}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
			>
				{cities.map((city, i) => (
					<Option key={i} value={city}>
						{city}
					</Option>
				))}
			</Select>
			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="Investor"
				defaultValue={[]}
				onChange={() => console.log("changed")}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
			>
				{cities.map((city, i) => (
					<Option key={i} value={city}>
						{city}
					</Option>
				))}
			</Select>
			<Button type="primary" danger>
				Search
			</Button>
			<Button danger style={{ float: "right" }}>
				Reset
			</Button>
		</Sider>
	);
};

export default Filter;
