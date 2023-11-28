import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CouponCard = ({ coupon }) => {
	const [copied, setCopied] = useState(false);
	const couponRef = useRef(coupon);
	useEffect(() => {
		const interval = setInterval(() => {
			setCopied(false);
		}, 10000);

		return () => clearInterval(interval);
	}, [copied]);
	return (
		<div
			style={{
				minWidth: 275,
				background: `linear-gradient(22deg, rgba(44,116,179,1) 0%, rgba(73,103,144,1) 49%, rgba(57,117,189,1) 100%)`,
				color: 'white',
				overflow: 'hidden',
				borderRadius: '15px',
				borderWidth: '0px',
				// boxShadow: '0 10px 10px 0 rgba(0,0,0,0.15)',
				position: 'relative',
				textAlign: 'center',
				padding: '2.5rem 5rem',
				// filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5))',
			}}
		>
			<CardContent>
				<Typography
					variant="h3"
					component={'h3'}
					fontSize={'26px'}
					lineHeight={'40px'}
				>
					15% off for new Sign Ups
				</Typography>

				<Stack direction={'row'} justifyContent={'center'} mt={2} sx={{}}>
					<Typography
						variant="body1"
						component={'span'}
						paddingX={2}
						border={'1px dashed '}
						paddingY={1}
					>
						{couponRef.current}
					</Typography>
					<CopyToClipboard
						text={couponRef.current}
						onCopy={() => {
							setCopied(true);
						}}
					>
						<Typography
							variant="body1"
							component={'button'}
							paddingX={2}
							paddingY={1}
							sx={{ cursor: 'pointer' }}
							color={copied ? 'green' : 'primary'}
							border={'1px solid white'}
						>
							{copied ? 'Copied!' : 'Copy Code'}
						</Typography>
					</CopyToClipboard>
				</Stack>
				<Typography mt={2}>VALID TILL JLJL</Typography>
				<Box
					component={'div'}
					sx={{
						background: 'white',
						width: '70px',
						borderRadius: '50%',
						position: 'absolute',
						top: '41%',
						height: '70px',
						left: '-35px',
					}}
				></Box>
				<Box
					component={'div'}
					sx={{
						background: 'white',
						width: '70px',
						borderRadius: '50%',
						position: 'absolute',
						top: '41%',
						height: '70px',
						right: '-35px',
					}}
				></Box>
			</CardContent>
		</div>
	);
};

CouponCard.propTypes = {
	coupon: PropTypes.string,
};

export default CouponCard;
