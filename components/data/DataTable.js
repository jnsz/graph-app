import ReactTable from 'react-table';

export default class DataInput extends React.Component{

    render() {
        const data = this.props.dataset;
        const columns = data.columns;
        console.log(data);
        console.log(columns);

        return (
            <ReactTable
                data={data}
                columns={columns}
            />
        )
    }

}
