import React from 'react';

const Collapse = (props) => {
	return (
		<div>
			<p>
				<button
					class='btn btn-primary'
					type='button'
					data-toggle='collapse'
					data-target='#collapseExample'
					aria-expanded='false'
					aria-controls='collapseExample'
				>
					Equipment
				</button>
			</p>
			<div class='collapse' id='collapseExample'>
				<div class='card card-body'>
					Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
					keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
				</div>
			</div>
		</div>
	);
};

export default Collapse;
