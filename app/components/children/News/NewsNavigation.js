// Include React
var React = require("react");
import { Link } from "react-router";
// Creating the Navigation component
var NewsNavigation = React.createClass({	
	render: function() {
	    return (

			<div className="container">
				<div className="row">
					<div className="col-sm-12">
					<br/>
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
								<button type="button" className="btn btn-info" id="runHuffington"><i className="fa fa-search"></i> The Huffington Post</button>
								<button type="button" className="btn btn-info" id="runGuardian"><i className="fa fa-search"></i> The Guardian</button>
								<button type="button" className="btn btn-info" id="runNPR"><i className="fa fa-search"></i> NPR</button>
								<button type="button" className="btn btn-info" id="runBBC"><i className="fa fa-search"></i> BBC</button>
								<button type="button" className="btn btn-info" id="runCNN"><i className="fa fa-search"></i> CNN</button>
								<button type="button" className="btn btn-info" id="runEconomist"><i className="fa fa-search"></i> The Economist</button>
								<button type="button" className="btn btn-info" id="runHill"><i className="fa fa-search"></i> The HILL</button>
								<button type="button" className="btn btn-info" id="runFOX"><i className="fa fa-search"></i> FOX News</button>
								<button type="button" className="btn btn-info" id="runBlaze"><i className="fa fa-search"></i> The Blaze</button>
								<button type="button" className="btn btn-default" id="clearAll"><i className="fa fa-trash"></i> Clear Results</button>
							</div>
						</div>
					</div>
				</div>

			</div>

	    )
	}
});

// Export the component back for use in other files
module.exports = NewsNavigation;


