import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ReviewCard = ({ review }) => {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
						A
					</Avatar>
				}
				title={
					<Stack direction={'row'} gap={4} alignItems={'center'}>
						<Typography>{review?.userName}</Typography>
						<Typography>
							4{' '}
							<StarIcon
								sx={{
									fontSize: 16,
									color: 'gold',
								}}
							/>
						</Typography>
					</Stack>
				}
				subheader="September 14, 2016"
			/>

			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{review.reviewText}
				</Typography>
			</CardContent>
		</Card>
	);
};

ReviewCard.propTypes = {
	review: PropTypes.object,
};

export default ReviewCard;
