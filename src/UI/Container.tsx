import styled from 'styled-components';

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
	width: -webkit-fill-available;
	padding: 14px 26px 13px 26px;
	borderbottom: 1px solid black;
	background-color: #000;
	box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 3px;
	height: 20px;
	z-index: 2;
	@media (max-width: 768px) {
		margin: 0;
		position: fixed;
		top: 0;
	}
`;

export const HeaderDateContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 26px 31px;
	height: calc(100vh - 100px);
	position: relative;
`;

export const HomeCyclesContainer = styled.div`
	display: block;
	margin: 31px 0px;
	max-height: calc(100vh - 270px);
	overflow: auto;
`;

export const CycleContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #F2F2F2;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12), 0px 16px 32px rgba(0, 0, 0, 0.08);
	border-radius: 8px;
	border-left: 9px solid #000;
	width: 310px;
	height: 274px;
	margin-left: 35px;
	margin-bottom: 35px;
	float: left;
	:hover {
		border-left: 9px solid #70BFF9;
		box-shadow: 0px 4px 8px rgba(112, 192, 249, 0.8), 0px 16px 32px rgba(112, 192, 249, 0.2);
	}
`;

export const CycleHeader = styled.div`
	display: flex;
	flex-direction: row;
	padding: 7px 17px;
	justify-content: space-between;
`;

export const CycleBody = styled.div`
	display: block;
	padding: 8px 47px 8px 47px;
`;

export const CycleBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	width: 97px;
	height: 97px;
	background: #FFFFFF;
	float: left;
	margin: 5px;
`;

export const SmallFlexColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1em;
	margin: auto;
	margin-bottom: 100px;
	width: 400px;
	margin: 100px auto;
	@media (max-width: 768px) {
		padding: 10px;
		flex-direction: column;
		margin: 80px auto;
	}
	@media (max-width: 768px) {
		padding: 10px;
		flex-direction: column;
		margin: 60px 0;
	}
	@media (max-width: 425px) {
		width: unset;
	}
`;