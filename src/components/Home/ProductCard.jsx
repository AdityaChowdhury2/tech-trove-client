import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BiUpvote } from 'react-icons/bi';
import { MdOutlineReportProblem } from 'react-icons/md';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
	const formatDate = date => {
		// const today = new Date();
		return formatDistance(new Date(date), new Date('2023-11-04T12:50:00Z'));
	};

	return (
		<Card>
			<CardHeader
				disableTypography
				title={
					<Typography
						variant="p"
						component={'h3'}
						color={'primary.main'}
						fontSize={{ sm: '24px', lg: '16px' }}
					>
						<Link
							to={`/products/${product._id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							{product.name}
						</Link>
					</Typography>
				}
				subheader={
					<Typography variant="p" component={'p'} fontSize={{ sm: '12px' }}>
						{product?.timestamp && formatDate(product?.timestamp)}
						{/* {(product?.timestamp &&
							formatDate(product?.timestamp).replace('about', '')) ||
							0}{' '}
						ago */}
					</Typography>
				}
			/>
			<CardMedia
				component="img"
				height="194"
				image={product.image}
				alt="Paella dish"
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{product.tags.map(tag => (
							<span key={tag.id}>#{tag.text} </span>
						))}
					</Typography>
					{product.status}
				</CardContent>
				<CardActions sx={{ gap: 1 }}>
					<IconButton
						sx={{ display: 'flex', alignItems: 'center' }}
						aria-label="upvote"
					>
						<BiUpvote size={12} />
						<Typography fontSize={12}>{product.upvote_count}</Typography>
					</IconButton>
				</CardActions>
			</div>
		</Card>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object,
};

export default ProductCard;
