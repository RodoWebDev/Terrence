import styled from 'styled-components';

export const NotificationContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
`;

export const LeftSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #70BFF9;
	width: 40%;
`;

export const RightSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	padding: 61px 39px;
`;

export const AvatarImg = styled.img`
	width: 50%;
	height: fit-content;
`;

export const NotificationImg = styled.img`
	width: auto;
	height: fit-content;
	border: 1px solid #E5E5E5;
	box-sizing: border-box;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
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
