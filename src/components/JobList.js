import React from "react";
import PropTypes from "prop-types";
import { Empty } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../queries/Jobs";
import Job from "./Job";

const JobList = (props) => {
	const { loading, error, data } = useQuery(QUERY_JOBS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	if (!data.jobs?.length) return <Empty>We couldn't find anything!</Empty>;

	return data.jobs.map((job) => <Job key={job.id} {...job} />);
};

JobList.propTypes = {};

export default JobList;
