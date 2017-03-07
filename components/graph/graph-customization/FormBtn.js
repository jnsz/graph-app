import FontAwesome from 'react-fontawesome';

export default class FormBtn extends React.Component {

	render() {


		return (
            <span className='input-group-btn'>
                <button className='btn btn-default' type='button'>
									<FontAwesome name='arrows-alt'/>
                </button>
            </span>
		);
	}
}
