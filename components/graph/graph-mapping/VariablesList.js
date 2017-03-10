import Variable from './Variable';

export default class VariablesList extends React.Component{

  render() {
    const variables = this.props.variables;

    return (
      <div className='col-md-9'>
        {variables.map((variable, i) => {
          return (
            <Variable
              key={i+'var'}
              variable={variable}
            />
          )
        })}
      </div>
    )
  }

}
