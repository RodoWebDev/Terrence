import styled from 'styled-components';

export const SuccessContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const SuccessTitle = styled.p`
	font-family: Avenir Next;
	font-style: normal;
	font-weight: 300;
	font-size: 44px;
	line-height: 150%;
	margin-bottom: 29px;
	text-align: center;
`;

export const SuccessDesc = styled.p`
	font-family: Avenir Next;
	font-style: normal;
	font-weight: 300;
	font-size: 32px;
	line-height: 150%;
	margin-bottom: 46px;
	text-align: center;
	max-width: 911px;
`;

export const SuccessLink = styled.a`
	font-family: Roboto;
	font-style: italic;
	font-weight: normal;
	font-size: 32px;
	line-height: 150%;
	text-align: center;
	text-decoration-line: underline;
	color: #70BFF9;
`;

export const NotificationTitle = styled.p`
	font-family: Avenir Next;
	font-style: normal;
	font-weight: 300;
	font-size: 28px;
	line-height: 150%;
	margin-top: 44px;
	margin-bottom: 14px;
	&.AvatarName {
		max-width: 240px;
		text-align: center;
	}
`;