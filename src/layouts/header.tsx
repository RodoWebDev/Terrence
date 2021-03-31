import React from 'react';
import { HeaderContainer, HeaderDateContainer } from 'UI/Container';
import { DateLabel } from 'UI/Label';

const Header = (props: any) => {
	const {startDate, endDate} = props;
	return (
		<HeaderContainer as="header" style={{ borderBottom: '1px solid black' }}>
			<HeaderDateContainer>
				<DateLabel><strong>Cycle Start Date: </strong>{startDate}</DateLabel>
				<DateLabel><strong>Cycle Finish Date: </strong>{endDate}</DateLabel>
			</HeaderDateContainer>
		</HeaderContainer>
	);
};

export default Header;
