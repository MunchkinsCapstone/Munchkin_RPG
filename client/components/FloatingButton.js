import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = (theme) => ({
	button: {
		margin: theme.spacing.unit
	},
	extendedIcon: {
		marginRight: theme.spacing.unit
	}
});

function FloatingActionButtons(props) {
	const { classes } = props;
	return (
		<div>
			<Button variant='extendedFab' aria-label='delete' className={classes.button}>
				<NavigationIcon className={classes.extendedIcon} />
				<Icon />
				Hand
			</Button>
			{/* <Button variant='fab' color='secondary' aria-label='delete' className={classes.button}>
				<DeleteIcon />
			</Button> */}
		</div>
	);
}

FloatingActionButtons.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
