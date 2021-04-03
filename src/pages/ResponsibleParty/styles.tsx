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