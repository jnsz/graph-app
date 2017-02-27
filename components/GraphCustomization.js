import CusFormGroup from './reusable/CusFormGroup';

export default class GraphCustomization extends React.Component {

	render() {




		return (

            <div className="container">
                <div className="wrapper">
                    <div className="row">



                        <CusFormGroup label="Size"
									  items={[{"type" : "btn", "name" : <i className='fa fa-arrows-alt'></i>},
											  {"type" : "addon", "name" : <i className='fa fa-arrows-h'></i>},
											  {"type" : "input", "placeholder" : "Default value"},
											  {"type" : "addon", "name" : <i className='fa fa-arrows-v'></i>},
											  {"type" : "input", "placeholder" : "Default value"}]}
						/>

						<CusFormGroup label="Legend"
						  			  items={[{"type" : "btn", "name" : <i className="fa fa-eye"></i>}]}
						/>

			 		    <CusFormGroup label="Graph title"
									  items={[{"type" : "btn", "name" : <i className="fa fa-eye"></i>},
						  					  {"type" : "input", "placeholder" : "Graph title"}]}
						/>



                    </div>
                </div>
            </div>

		);
	}

}
