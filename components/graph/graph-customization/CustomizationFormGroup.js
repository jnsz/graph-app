import FormBtn from './FormBtn'
import VisibilityBtn from './VisibilityBtn'

export default class CustomizationFormGroup extends React.Component {

	render() {
		const items = this.props.items;

		return (
      <div className="form-group col-md-6">
        <label>
          {this.props.label}
        </label>

		<div className="input-group">

			{items.map(item => {
				switch(item.type) {
					case "btn":
						return (
							<span key={items.indexOf(item)} className="input-group-btn">
				                <button className="btn btn-default" type="button">
				                    {item.name}
				                </button>
				            </span>
						)
						break;
					case "btn-group":

						return (
							<span key={items.indexOf(item)} className="input-group-btn">
								<button className="btn btn-default" type="button">
									{item.name}
								</button>
							</span>

						)

					case "btn-vis":
						return (
							<span key={items.indexOf(item)} className="input-group-btn">
								{/*<VisibilityButton />*/}
								<button className="btn btn-default" type="button">
									{item.name}
								</button>
				      </span>
						)
					case "addon":
						return (
							<span key={items.indexOf(item)} className="input-group-addon">
				                {item.name}
				            </span>
						)
						break;
					case "input":
						return (
							<input key={items.indexOf(item)} type="text" className="form-control" placeholder={item.placeholder}>{item.value}</input>
						)
				}
			})
		}

        </div>
		</div>
		);
	}
}
