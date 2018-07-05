import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4
	}
});

let openSnackbarFn;

class SimpleSnackbar extends React.Component {
	state = {
		open: false,
		message: 'hello world'
	};

	componentDidMount() {
		openSnackbarFn = this.handleClick;
	}

	handleClick = (message) => {
		this.setState({ open: true, message });
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				{/* <Button onClick={this.handleClick}>Open simple snackbar</Button> */}
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
					open={this.state.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id='message-id'>{this.state.message}</span>}
					action={[
						<Button key='undo' color='secondary' size='small' onClick={this.handleClose}>
							Do Something
						</Button>,
						<IconButton
							key='close'
							aria-label='Close'
							color='inherit'
							className={classes.close}
							onClick={this.handleClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

SimpleSnackbar.propTypes = {
	classes: PropTypes.object.isRequired
};

export function openSnackbar(message) {
	openSnackbarFn(message);
}

export default withStyles(styles)(SimpleSnackbar);
