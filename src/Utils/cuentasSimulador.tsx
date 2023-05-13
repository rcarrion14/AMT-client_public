export const cuentasSimulador = (
  ultimoPago: number,
  precioBtcb: number,
  precioAmt: number,
  totalSupply: number,
  cantidad: number
) => {
  let cobradoUnitario_btcb = ultimoPago / totalSupply;

  let rentPorcent_usdt_diario = Number(
    (((cobradoUnitario_btcb * precioBtcb) / precioAmt) * 100).toFixed(5)
  );

  let cobradoTotal_btcb_diario = Number(
    (cobradoUnitario_btcb * cantidad).toFixed(5)
  );

  let autoCompra_amt_diario = Number(
    ((cobradoTotal_btcb_diario * precioBtcb) / precioAmt).toFixed(2)
  );

  /////// --- MENSUAL: ------ /////

  let rentPorcent_usdt_mensual = Number(
    (rentPorcent_usdt_diario * 30).toFixed(3)
  );
  let cobradoTotal_btcb_mensual = Number(
    (cobradoTotal_btcb_diario * 30).toFixed(3)
  );
  let autoCompra_amt_mensual = Number(
    (
      cantidad * (1 + (cobradoUnitario_btcb * precioBtcb) / precioAmt) ** 30 -
      cantidad
    ).toFixed(0)
  );

  /////// --- ANUAL: ------ /////

  let rentPorcent_usdt_anual = rentPorcent_usdt_diario * 365;
  let cobradoTotal_btcb_anual = Number(
    (cobradoTotal_btcb_diario * 365).toFixed(3)
  );
  let autoCompra_amt_anual = Number(
    (
      cantidad * (1 + (cobradoUnitario_btcb * precioBtcb) / precioAmt) ** 365 -
      cantidad
    ).toFixed(0)
  );

  return {
    rentPorcent_usdt_diario,
    cobradoTotal_btcb_diario,
    autoCompra_amt_diario,

    rentPorcent_usdt_mensual,
    cobradoTotal_btcb_mensual,
    autoCompra_amt_mensual,

    rentPorcent_usdt_anual,
    cobradoTotal_btcb_anual,
    autoCompra_amt_anual,
  };
};
