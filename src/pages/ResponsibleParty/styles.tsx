import styled from 'styled-components';

export const RpStatus = styled.p`
	font-family: Avenir Next;
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 150%;
	letter-spacing: -0.001em;
	border-radius: 3px;
	cursor: pointer;
	text-align: center;
	float: right;
	&.NotSent {
		background: #C4C4C4;
		padding: 2px 8px;
	}
	&.WithRP {
		background: #E8D000;
		padding: 2px 8px;
	}
	&.Complete {
		background: #3CE800;;
		padding: 2px 8px;
	}
`;

export const CycleDetailsRightLabel = styled.p`
	font-size: 10px;
	padding: 6px 0;
	height: 25px;
`;

export const SwitchContainer = styled.div`
	width: 60px;
	height: 20px;
	background: #F2F2F2;
	border-radius: 9.70061px;
	position: relative;
	cursor: pointer;
	margin-bottom: 5px;
`;

export const SwitchInsideContainer = styled.div`
	width: 30px;
	height: 16px;
	position: absolute;
	top: 2px;
	color: #fff;
	font-family: Avenir Next;
	font-style: normal;
	font-weight: normal;
	line-height: 140%;
	border-radius: 40.4192px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 10px;
	&.yes {
		background: #307FE2;
		left: 3px;
	}
	&.no {
		background: #EF6262;
		right: 3px;
	}
`;
