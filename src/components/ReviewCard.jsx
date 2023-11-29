import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'date-fns';

const ReviewCard = ({ review }) => {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar alt={review?.userName} aria-label="recipe">
						{review?.userName[0]}
					</Avatar>
				}
				title={
					<Stack direction={'row'} gap={4} alignItems={'center'}>
						<Typography variant="body1" component={'p'}>
							{review?.userName}
						</Typography>
						<Typography>
							{review?.rating}
							<StarIcon
								sx={{
									fontSize: 16,
									color: 'gold',
								}}
							/>
						</Typography>
					</Stack>
				}
				subheader={format(new Date(review.timestamp), 'MMMM, dd yyyy')}
			/>
			<CardContent>
				<Typography variant="body2" color="">
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
