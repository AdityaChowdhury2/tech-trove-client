import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { format } from 'date-fns';

const CouponCard = ({ coupon }) => {
	const [copied, setCopied] = useState(false);
	const couponRef = useRef(coupon.code);
	useEffect(() => {
		const interval = setInterval(() => {
			setCopied(false);
		}, 10000);

		return () => clearInterval(interval);
	}, [copied]);
	return (
		<Grid item sm={6} marginRight={4}>
			<div
				style={{
					minWidth: 275,
					background: `linear-gradient(45deg, #C5FFF8 0%, #5FBDFF 100%)`,
					color: '#143347',
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
						fontSize={'18px'}
						lineHeight={'40px'}
					>
						{coupon.description}
					</Typography>

					<Stack
						direction={'row'}
						justifyContent={'center'}
						alignItems={'center'}
						mt={2}
					>
						<Typography
							variant="body1"
							component={'span'}
							paddingX={2}
							fontSize={12}
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
								fontSize={12}
								paddingY={1}
								sx={{ cursor: 'pointer' }}
								color={copied ? 'green' : '#143347'}
								border={'1px solid white'}
							>
								{copied ? 'Copied!' : 'Copy Code'}
							</Typography>
						</CopyToClipboard>
					</Stack>
					<Typography mt={2}>
						Valid till {format(new Date(coupon.expiryDate), 'MMM, yyyy')}
					</Typography>
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
		</Grid>
	);
};

CouponCard.propTypes = {
	coupon: PropTypes.object,
};

export default CouponCard;
