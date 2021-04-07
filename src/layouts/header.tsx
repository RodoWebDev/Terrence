import React from 'react';
import { HeaderContainer, HeaderDateContainer } from 'UI/Container';
import { DateLabel } from 'UI/Label';
import { getDate } from 'utils/functions';

const Header = (props: any) => {
	const {startDate, endDate} = props;
	return (
		<HeaderContainer as="header" style={{ borderBottom: '1px solid black' }}>
			<HeaderDateContainer>
				{startDate && <DateLabel><strong>Cycle Start Date: </strong>{getDate(startDate)}</DateLabel>}
				{endDate && <DateLabel><strong>Cycle Finish Date: </strong>{getDate(endDate)}</DateLabel>}
			</HeaderDateContainer>
		</HeaderContainer>
	);
};

export default Header;
