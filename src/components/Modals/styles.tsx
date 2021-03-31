import styled from 'styled-components';

export const Title = styled.p`
	font-family: Avenir Next;
	font-style: normal;
	font-weight: 600;
	font-size: 22px;
	line-height: 150%;
	color: #999999;
`;

export const Manual = styled.a`
	font-family: Avenir Next;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 150%;
	color: #70BFF9;
	margin-bottom: 6px;
	margin-top: 18px;
	cursor: pointer;
  text-decoration: none;
`;

export const FlexRow = styled.div`
	display: flex;
  flex-direction: row;
`;

export const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	&.first {
		margin-right: 30px;
	}
`;