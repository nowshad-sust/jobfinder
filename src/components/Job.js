import React from "react";
import PropTypes from "prop-types";
import { Card, Skeleton, Typography, Row, Col, List } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Job = ({
	id,
	title,
	city,
	company: { name: companyName, company_investors },
	loading = false,
}) => {
	return (
		<Card size="large" hoverable active="true" style={{ margin: "10px 0" }}>
			<Skeleton loading={loading} active="true">
				<Row>
					<Col span={16}>
						<Title level={4} style={{ color: "#fb236a", marginBottom: 0 }}>
							{title}
						</Title>
						<Text style={{ color: "#fb236a" }} type="secondary">
							{companyName}
						</Text>
						<br /> <br />
						<Text type="secondary">
							<EnvironmentOutlined /> {city}
						</Text>
					</Col>
					<Col span={8}>
						<List
							size="small"
							dataSource={company_investors}
							bordered
							renderItem={({ investor }) => (
								<List.Item>{investor.name}</List.Item>
							)}
						/>
					</Col>
				</Row>
			</Skeleton>
		</Card>
	);
};

Job.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	city: PropTypes.string,
	company: PropTypes.object,
};

export default Job;
