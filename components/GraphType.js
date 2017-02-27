import ButtonGroup from './reusable/ButtonGroup';

export default class GraphType extends React.Component{

  render() {

    const graphs =
    [
        {
            name:"Bar chart",
            label:"Bar chart icon",
            subtypes:[
                [
                    {
                        name:"Bar chart grouped"
                    },
                    {
                        name:"Bar chart stacked"
                    }
                ],
                [
                    {
                        name:"Vertical"
                    },
                    {
                        name:"Horizontal"
                    }
                ]
            ]
        },
        {
            name:"Pie chart",
            label:"Pie chart icon",
            subtypes:[
                [
                    {
                        name:"Pie chart"
                    },
                    {
                        name:"Donut chart"
                    }
                ]
            ]
        },
        {
            name:"Line chart",
            label:"Line chart icon",
            subtypes:[
                [
                    {
                        name:"Line"
                    },
                    {
                        name:"Curve"
                    }
                ],
                [
                    {
                        name:"No fill"
                    },
                    {
                        name:"Fill"
                    }
                ]
            ]
        },
        {
            name:"Scatter plot",
            label:"Scatter plot icon"
        }
    ];

    return (

        <div className="wrapper">
            <div className="row">
                <div className="col-md-12">
                    <ButtonGroup labels={graphs.map(type => {return type.name;})} />
                </div>
            </div>

            {graphs.map(type => {
                if(typeof type.subtypes !== "undefined"){
                    return <div className="row">
                    {type.subtypes.map(subtype => {
                        const subtypeList = subtype.map(object => {
                            return object.name
                        })
                        return (
                            <div className="col-md-6">
                            <ButtonGroup labels={subtypeList} />
                            </div>
                        )
                    })}

                    </div>
                }
            })}

        </div>
    );
  }

}
