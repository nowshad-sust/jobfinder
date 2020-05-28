import React, { useState, useContext, useEffect } from "react";
import { Empty, List, Card, Skeleton, Alert } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../queries/Jobs";
import { store } from "../store/store";
import Job from "./Job";
import { Shimmer, ErrorBlock, EmptyBlock } from "./Commons";

const LIMIT_PER_PAGE = 10;

const JobList = (props) => {
	const { state } = useContext(store);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [jobs, setJobs] = useState([]);

	const { keyword, cities, companies, investors } = state;

	const { loading, networkStatus, error, data, fetchMore } = useQuery(
		QUERY_JOBS,
		{
			variables: {
				limit: LIMIT_PER_PAGE,
				offset: 0,
				keyword: keyword ? `%${keyword}%` : "%%",
				cities: cities.length > 0 ? cities : null,
				companies: companies.length > 0 ? companies : null,
				investors: investors.length > 0 ? investors : null,
			},
			notifyOnNetworkStatusChange: true,
		}
	);

	const reFetching = networkStatus === 4;

	useEffect(() => {
		setJobs([]);
		setHasMore(true);
		setPage(1);
	}, [keyword, cities, companies, investors]);

	useEffect(() => {
		if (data?.jobs) {
			setJobs(data.jobs);
		}
	}, [data]);

	const loadMore = () => {
		if (loading || reFetching) return;
		setPage((page) => page + 1);
		fetchMore({
			variables: {
				offset: page * LIMIT_PER_PAGE,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				if (fetchMoreResult?.jobs?.length === 0) {
					setHasMore(false);
				}
				return Object.assign({}, prev, {
					jobs: [...prev.jobs, ...fetchMoreResult.jobs],
				});
			},
		});
	};

	if (page === 1 && loading) return <Shimmer />;
	if (error) return <ErrorBlock />;
	if (jobs.length === 0) return <EmptyBlock />;

	return (
		<div style={{ height: "90vh", overflow: "auto" }}>
			<InfiniteScroll
				initialLoad={false}
				pageStart={0}
				loadMore={loadMore}
				hasMore={hasMore}
				useWindow={false}
			>
				<List
					dataSource={jobs}
					renderItem={(job) => <Job key={job.id} {...job} />}
				/>
				{(loading || reFetching) && (
					<div style={{ width: "100%", textAlign: "center" }}>
						<Shimmer />
					</div>
				)}
			</InfiniteScroll>
		</div>
	);
};

export default JobList;
