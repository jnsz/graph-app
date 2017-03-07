import FormBtn from './FormBtn'
import VisibilityBtn from './VisibilityBtn'

export default class CustomizationFormGroup extends React.Component {

	render() {
		return (
      <div className='form-group col-md-3'>
        <label>
          {this.props.label}
        </label>

				<div className='input-group'>
					{ this.renderInputGroup() }
        </div>
			</div>
		)
	}

	renderInputGroup(){
		const items = this.props.items;

		return(
			items.map(item => {
				switch(item.type) {

					case 'btn':
						return (
							<span key={items.indexOf(item)} className='input-group-btn'>
								<button className='btn btn-default' type='button'>
									{item.name}
								</button>
							</span>
						)
						break;

					case 'btn-group':
						return (
							<span key={items.indexOf(item)} className='input-group-btn'>
								<button className='btn btn-default' type='button'>
									{item.name}
								</button>
							</span>
						)
						break;

					case 'btn-vis':
						return (
							<span key={items.indexOf(item)} className='input-group-btn'>
								{/*<VisibilityButton />*/}
								<button className='btn btn-default' type='button'>
									{item.name}
								</button>
							</span>
						)
						break;

					case 'addon':
						return (
							<span key={items.indexOf(item)} className='input-group-addon'>
								{item.name}
							</span>
						)
						break;

						case 'addon-empty':
							return (
								<span key={items.indexOf(item)} className='input-group-addon' style={{padding:'0'}}></span>
							)
							break;

					case 'input':
						return (
							<input
								key={items.indexOf(item)}
								type='text'
								className='form-control'
								placeholder={item.text}
								value={item.value}
								onChange={e => {item.onChange(e.target.value)}}
							></input>
						)
						break;
				}
			})
		)
	}
}
