import React from "react";
import { Empty, List, Card, Skeleton, Alert } from "antd";

export const Shimmer = () => (
	<Card style={{ width: "100%" }} loading={true}>
		<Skeleton loading={true} active paragraph title></Skeleton>
	</Card>
);

export const ErrorBlock = () => (
	<Alert
		message="Error"
		description="Something went wrong!."
		type="error"
		showIcon
	/>
);

export const EmptyBlock = () => <Empty>We couldn't find anything!</Empty>;
