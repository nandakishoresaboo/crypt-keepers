import * as React from 'react';

interface ICoin {
  price: string,
  bid: string,
  ask: string,
  size: string,
  time: string,
  volume: string,
};

interface ITableProps {
  coin: ICoin,
  name: string,
  onClick: any, // TBD fix to function
}

// const defaultProps = {
//   coin: {},
//   name: '',
//   onClick: e => (e),
// };

const nameToSymbol = { BTC: 'Bitcoin', LTC: 'Litecoin', ETH: 'Etherium' };

const TableRow = (props: ITableProps) => (
  <tr onClick={props.onClick}>
    <th>{nameToSymbol[props.name]}</th>
    <th>{Number(props.coin.price).toFixed(2) || 0} </th>
    <th>{Number(props.coin.bid).toFixed(2) || 0}</th>
    <th>{Number(props.coin.ask).toFixed(2) || 0}</th>
  </tr>
);


export default TableRow;
