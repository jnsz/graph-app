export default class pieChart extends React.Component {
  static graphName = 'pieChart';
  static variables = [
    {
        label: 'Pie',
        desc: 'labels on x axis',
        isRequired: true,
        takesSingleDimension: false,
        assignedDimensions:[]
    }
  ];
  static settings = {
    graphLabel:'Pie Chart',
  };
  static customizations = [
    {
      type: 'form group',
      label: 'PIE TEST FORM GROUP 1',
      items: [
        {
          type: 'btn',
          label: 'B',
          active: true,
          onChange: ''
        },{
          type: 'input',
          placeholder: 'empty field',
          value: 'filled field',
          onChange: 'TO IMPLEMENT'
        },{
          type: 'addon',
          label: 'A'
        }
      ]
    }
  ];

}
