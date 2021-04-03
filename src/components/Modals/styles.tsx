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
	&.analysis_header {
		align-items: center;
    justify-content: space-between;
	}
`;

export const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	&.first {
		margin-right: 30px;
	}
`;

export const SubTitle = styled.p`
	font-family: Avenir Next;
	font-style: normal;
	font-size: 16px;
	line-height: 150%;
	letter-spacing: -0.07em;
	color: #00249C;
	margin-top: 8px;
	margin-bottom: 22px;
`;

export const SubDesc = styled.p`
	font-family: Avenir Next;
	font-style: normal;
	font-size: 12px;
	line-height: 150%;
	letter-spacing: -0.07em;
	color: #707070;
`;