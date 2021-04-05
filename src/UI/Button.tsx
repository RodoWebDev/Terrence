import styled from 'styled-components';

export const Button = styled.button`
	font-family: Avenir Next;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 150%;
	text-align: center;
	padding: 12px 12.5px;
	background: #70BFF9;
	border-radius: 4px;
	color: #FFFFFF;
	border: none;
	outline: none;
	width: 171px;
	position: absolute;
	left: 65px;
	bottom: 60px;
	:hover {
		background: #098ef0;
	}
	&.bottom_button {
		:disabled {
			background: #707070;
		}
	}
	&.bottom_post_button {
		left: 271px;
		:disabled {
			background: #707070;
		}
	}
	&.bottom_posona_button {
		left: unset;
		bottom: 0;
		right: 0;
		font-size: 28px;
		width: 264px;
		:disabled {
			background: #707070;
		}
	}
	&.no_fixed_position {
		position: unset;
		display: flex;
    justify-content: space-around;
  }
	&.continue_btn {
		position: unset;
		display: flex;
		justify-content: space-around;
		width: unset;
  }
`;