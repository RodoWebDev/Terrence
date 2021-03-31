import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SmallFlexColumn } from 'UI/Container';

const Loading = () => {
	return (
		<SmallFlexColumn>
			<CircularProgress />
		</SmallFlexColumn>
	);
};

export default Loading;
