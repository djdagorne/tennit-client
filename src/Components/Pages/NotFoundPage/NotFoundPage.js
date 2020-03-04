import React, {Component} from 'react';

/* 
Upon a page breaking error or a invalid URL request I reroute users to this small 404 page.
*/

class NotFoundPage extends Component {
    render() {
		return (
			<div className="content-container">
				<div>
					<h2>Page not found</h2>
					<p>Try going back to your previous page.</p>
				</div>
			</div>
		)
    }
}

export default NotFoundPage;