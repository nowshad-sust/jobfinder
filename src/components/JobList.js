import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Empty } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../queries/Jobs";
import Job from "./Job";
import { store } from "../store/store";
import {
	setKeyword,
	setCities,
	setCompanies,
	setInvestors,
} from "../store/actions";

const JobList = (props) => {
	const { state, dispatch } = useContext(store);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(false);
	const [jobs, setJobs] = useState([]);

	const { keyword, cities, companies, investors } = state;

	const { loading, error, data, refetch } = useQuery(QUERY_JOBS, {
		variables: {
			keyword: keyword ? `%${keyword}%` : "%%",
			cities: cities.length > 0 ? cities : null,
			companies: companies.length > 0 ? companies : null,
			investors: investors.length > 0 ? investors : null,
		},
	});

	useEffect(() => {
		refetch();
	}, [keyword, cities, companies, investors]);

	useEffect(() => {
		if (data?.jobs) {
			setJobs(data.jobs);
		}
	}, [data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	if (jobs.length === 0) return <Empty>We couldn't find anything!</Empty>;

	return jobs.map((job) => <Job key={job.id} {...job} />);
};

JobList.propTypes = {};

export default JobList;
