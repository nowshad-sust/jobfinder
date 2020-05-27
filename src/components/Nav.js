import React, { useState } from "react";
import { Layout, Typography } from "antd";
import { AuditOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

const Nav = () => {
	return (
		<Header
			style={{
				position: "fixed",
				zIndex: 1,
				width: "100%",
				background: "white",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			theme="light"
		>
			<AuditOutlined style={{ fontSize: "30px", color: "#fb236a" }} />
			<Typography.Title level={2} style={{ margin: 0, color: "#fb236a" }}>
				Job Finder
			</Typography.Title>
		</Header>
	);
};

export default Nav;
