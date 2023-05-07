import { languageCode } from "../store/features/session/sessionSlice";

export const textoMarketplace = (idioma: string) => {
  if (idioma === "por") {
    return (
      <>
        <h1>Marketplace</h1>
        <p>
          Para comprar AMT basta ter saldo na sua MetaMask, que pode estar em
          qualquer moeda da Rede de BSC.
        </p>
        <p>A taxa de gás da rede, porém, é sempre cobrada em BNB.</p>
        <p>
          Para visualizar qualquer token em sua MetaMask é preciso importá-lo
          primeiro, mas nós facilitamos isso para você!
        </p>
        <p>
          Clique no botão abaixo e importe os principais tokens da Rede BSC
          (Binance Smart Chain) que são utilizados com frequência pela
          comunidade AMT. É grátis, útil e seguro!
        </p>
      </>
    );
  } else if (idioma === "esp") {
    return (
      <>
        <h1>Marketplace</h1>
        <p>
          Para comprar AMT solo necesitas tener saldo en tu MetaMask, que puede
          estar en cualquier moneda de la Red de BSC.
        </p>
        <p>La tarifa de gas de la red, sin embargo, siempre se cobra en BNB.</p>
        <p>
          Para visualizar cualquier token en tu MetaMask es necesario importarlo
          primero, ¡pero nosotros lo hacemos más fácil para ti!
        </p>
        <p>
          Haz clic en el botón de abajo e importa los principales tokens de la
          Red BSC (Binance Smart Chain) que se utilizan con frecuencia por la
          comunidad AMT. ¡Es gratis, útil y seguro!
        </p>
      </>
    );
  } else if (idioma === "eng") {
    return (
      <>
        <h1>Marketplace</h1>
        <p>
          To buy AMT, you just need to have a balance in your MetaMask wallet,
          which can be in any currency on the BSC Network.
        </p>
        <p>However, the network gas fee is always charged in BNB.</p>
        <p>
          To view any token in your MetaMask, you need to import it first, but
          we make it easy for you!
        </p>
        <p>
          Click the button below and import the main tokens of the BSC Network
          that are frequently used by the AMT community. It's free, useful, and
          secure!
        </p>
      </>
    );
  }
};

export const textoStore = (idioma: string, func: Function) => {
  if (idioma == "por") {
    return (
      <>
        <h1>AMT Store</h1>
        <p>
          Esse é o marketplace oficial do AutoMiningToken. Aqui você pode
          comprar seus AMTs e pagar un preço fixo por eles, independentemente da
          quantidade que comprar.
        </p>
        <p>
          Recomenda-se comprar AMT por aqui sempre que o preço estiver menor ou
          igual da PancakeSwap.
        </p>
        <p>
          A compra no AMT Store favorece o projeto como um todo, já que os
          recursos são 100% destinados para novos investimentos no projeto AMT,
          como compra de máquinas de mineração, contratação de pessoas ou
          serviços, etc.
        </p>
        <p>
          A compra de AMT no AMT Store deve ser feita usando USDT. Caso precise
          trocar outra moeda por USDT, para conseguir comprar AMT.{" "}
          <u onClick={() => func()}>Clique aquí</u>
        </p>
      </>
    );
  } else if (idioma == "esp") {
    return (
      <>
        <h1>Tienda AMT</h1>
        <p>
          Esta es la tienda oficial de AutoMiningToken. Aquí puedes comprar tus
          AMTs y pagar un precio fijo por ellos, independientemente de la
          cantidad que compres.
        </p>
        <p>
          Se recomienda comprar AMT por aquí siempre que el precio esté menor o
          igual al de PancakeSwap.
        </p>
        <p>
          La compra en AMT Store beneficia al proyecto en su conjunto, ya que
          los recursos se destinan al 100% a nuevas inversiones en el proyecto
          AMT, como la compra de máquinas mineras, la contratación de personal o
          servicios, etc.
        </p>
        <p>
          La compra de AMT en la Tienda AMT se debe realizar mediante USDT. en
          caso de que necesites cambiar otra moneda por USDT, para poder comprar
          AMT. <u onClick={() => func()}>Cliquee aquí.</u>
        </p>
      </>
    );
  } else if (idioma == "eng") {
    return (
      <>
        <h1>AMT Store</h1>
        <p>
          This is the official marketplace of AutoMiningToken. Here you can buy
          your AMTs and pay a fixed price for them, regardless of the quantity
          you buy.
        </p>
        <p>
          It is recommended to buy AMT here whenever the price is lower or equal
          to that of PancakeSwap.
        </p>
        <p>
          Buying from AMT Store benefits the project as a whole, as resources
          are 100% dedicated to new investments in the AMT project, such as
          purchasing mining machines, hiring personnel or services, etc.
        </p>
        <p>
          Purchasing AMT from the AMT Store must be done using USDT. In case you
          need exchange another currency for USDT, to be able to buy AMT.{" "}
          <u onClick={() => func()}>Click here.</u>
        </p>
      </>
    );
  }
};

export const textoPancake = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>PancakeSwap</h1>
        <p>Esse é o marketplace da PancakeSwap.</p>
        <p>
          Recomenda-se comprar AMT por aqui sempre que o preço estiver menor que
          o da AMT Store.
        </p>
        <p>
          O preço do AMT na PancakeSwap depende, dentre outros fatores, da
          quantia que está sendo transacionada: quanto mais AMT você compra,
          mais caro eles ficam.
        </p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>PancakeSwap</h1>
        <p>Este es el mercado de PancakeSwap.</p>
        <p>
          Se recomienda comprar AMT aquí siempre que el precio sea menor que el
          de AMT Store.
        </p>
        <p>
          El precio de AMT en PancakeSwap depende, entre otros factores, de la
          cantidad que se está negociando: cuanto más AMT compre, más caros se
          vuelven.
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>PancakeSwap</h1>
        <p>This is the PancakeSwap marketplace.</p>
        <p>
          It is recommended to buy AMT here whenever the price is lower than
          that of AMT Store.
        </p>
        <p>
          The price of AMT on PancakeSwap depends, among other factors, on the
          amount being transacted: the more AMT you buy, the more expensive they
          become.
        </p>
      </>
    );
  }
};

export const textoQuema = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Venda seus AMT</h1>
        <p>Esse é o Cofre de Garantia do Projeto AMT.</p>
        <p>
          Quando um usuário troca seus AMT por BTCB, os AMT são queimados, isto
          é, retirados de circulação.
        </p>
        <p>Por isso, o preço do AMT não cai, mas se mantém.</p>
        <p>
          E, considerando que esse Cofre recebe mais bitcoins a cada día, isso
          significa que a relação AMT/BTCB só irá melhorar.
        </p>
        <p>
          Em outras palavras, esse Cofre estabelece um piso para o preco da AMT.
        </p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>Vende tus AMT</h1>
        <p>Este es el Cofre de Garantía del Proyecto AMT.</p>
        <p>
          Cuando un usuario cambia sus AMT por BTCB, los AMT son quemados, es
          decir, retirados de circulación.
        </p>
        <p>Por eso, el precio del AMT no cae, sino que se mantiene.</p>
        <p>
          Y, considerando que este Cofre recibe más bitcoins cada día, esto
          significa que la relación AMT/BTCB solo mejorará.
        </p>
        <p>
          En otras palabras, este Cofre establece un piso para el precio del
          AMT.
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>Sell your AMT</h1>
        <p>This is the AMT Project Guarantee Safe.</p>
        <p>
          When a user trades their AMT for BTCB, the AMT is burned, that is,
          taken out of circulation.
        </p>
        <p>That's why the price of AMT doesn't fall, but stays the same.</p>
        <p>
          And considering that this Safe receives more bitcoins every day, it
          means that the AMT/BTCB ratio will only improve.
        </p>
        <p>In other words, this Safe sets a floor for the AMT price.</p>
      </>
    );
  }
};

export const textoPix = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Compra e venda com PIX</h1>
        <p>
          O nosso time está trabalhando para disponibilizar essa funcionalidade
          de forma automática aqui no site, bem como a compra recorrente com
          carta-o de crédito.
        </p>
        <p>
          Enquanto isso, você pode nos chamar no WhatsApp ou no Telegram para
          comprar ou vender criptos com PIX.
        </p>
        <p>
          O atendimento de nosso time é em horário comercial, de segunda a
          sexta-feira, das 9 hs. ás 18 hs.
        </p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>Compra y venta con PIX</h1>
        <p>
          Nuestro equipo está trabajando para ofrecer esta función de forma
          automática aquí en el sitio web, así como la compra recurrente con
          tarjeta de crédito.
        </p>
        <p>
          Mientras tanto, puedes contactarnos a través de WhatsApp o Telegram
          para comprar o vender criptomonedas con PIX.
        </p>
        <p>
          Nuestro equipo atiende en horario comercial, de lunes a viernes, de 9
          a.m. a 6 p.m.
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>Buy and sell with PIX</h1>
        <p>
          Our team is working to make this feature available automatically on
          the website, as well as recurring purchases with credit cards.
        </p>
        <p>
          In the meantime, you can contact us on WhatsApp or Telegram to buy or
          sell cryptocurrencies with PIX.
        </p>
        <p>
          Our team is available during business hours, Monday through Friday,
          from 9 a.m. to 6 p.m.
        </p>
      </>
    );
  }
};

export const textoInvestidores = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <div>
          <p>
            O Projeto AMT nao custodia o dinheiro dos investidores, dde modo que
            e possivel receber seus rendimientos em bitcoin mesmo mantendo seus
            AMT em sua MetaMask
          </p>
          <p>
            No entanto, para enviar seus rendimientos em BTCB para a sua
            MetaMask voce precisará pagar taza de gás e fazer isso diariamente,
            o que afetará a sua rentabilidade.
          </p>
          <p>
            Por isso, criamos a possibilidade de voce colocar o seus tokens em
            "staking", isto é, depositalá-los em um contrato inteligente seguro
            para acumular seus rendimientos de forma automatica e sem precisasr
            pagar tazas diárias.
          </p>
          <p>
            É preciso pagar taza apenas ao depositar e ao retirar os tokens do
            staking, mesmo que os manthnha lá por anos.
          </p>
          <p>
            Os seus rendimientos sao enviados para este "cofre" de staking e
            voce vai recebendo passivamente, enquanto quiser. Só a carteira que
            depositou os tokens é que poderá retirá-los de lá, mais ninguém terá
            acesso.
          </p>
          <p>Conheca abaixo as modalidades de que dispomos</p>
        </div>
      </>
    );
  }

  if (idioma === "eng") {
    return (
      <>
        <div>
          <p>
            The AMT Project does not custody investors' money, so it is possible
            to receive your returns in Bitcoin while keeping your AMT in your
            MetaMask wallet.
          </p>
          <p>
            However, to send your BTCB returns to your MetaMask wallet, you will
            need to pay a gas fee and do it daily, which will affect your
            profitability.
          </p>
          <p>
            That's why we have created the possibility for you to stake your
            tokens, i.e., deposit them in a secure smart contract to accumulate
            your returns automatically and without the need to pay daily fees.
          </p>
          <p>
            You only need to pay fees when depositing and withdrawing tokens
            from staking, even if you keep them there for years.
          </p>
          <p>
            Your returns are sent to this staking "vault," and you will receive
            them passively for as long as you want. Only the wallet that
            deposited the tokens can withdraw them, and nobody else will have
            access to them.
          </p>
          <p>See below the modalities we offer</p>
        </div>
      </>
    );
  }

  if (idioma === "esp") {
    return (
      <>
        <div>
          <p>
            El proyecto AMT no custodia el dinero de los inversores, por lo que
            es posible recibir tus rendimientos en Bitcoin mientras mantienes
            tus tokens AMT en tu cartera MetaMask.
          </p>
          <p>
            Sin embargo, para enviar tus rendimientos en BTCB a tu cartera
            MetaMask, deberás pagar una tarifa de gas y hacerlo diariamente, lo
            que afectará tu rentabilidad.
          </p>
          <p>
            Por eso, hemos creado la posibilidad de que apuestes tus tokens, es
            decir, los deposites en un contrato inteligente seguro para acumular
            tus rendimientos de forma automática y sin necesidad de pagar
            tarifas diarias.
          </p>
          <p>
            Solo necesitas pagar tarifas al depositar y retirar tokens de la
            apuesta, incluso si los mantienes allí durante años.
          </p>
          <p>
            Tus rendimientos se envían a este "cofre" de apuestas, y los
            recibirás de forma pasiva durante el tiempo que desees. Solo la
            cartera que depositó los tokens puede retirarlos, y nadie más tendrá
            acceso a ellos.
          </p>
          <p>A continuación, se muestran las modalidades que ofrecemos:</p>
        </div>
      </>
    );
  }
};

export const textoInfoAllowance = (idioma: string) => {
  if (idioma === "por") {
    return (
      <>
        <p>
          ATENÇÃO: caso seja a primeira vez que você faz staking, você precisará
          aprovar esse contrato inteligente na sua MetaMask. Para isso basta
          clicar em "Habilitar Staking". Depois, sua MetaMask pedirá a sua
          confirmação e fará a cobrança da taxa de gás que é única e típica para
          esse tipo de transação.
        </p>
        <p>
          Depois você poderá clicar em "Fazer staking". Novamente, a sua
          MetaMask irá solicitar a sua confirmação para pagar a taxa de gás da
          rede. Feito isso, o staking estará concluido.
        </p>
      </>
    );
  }

  if (idioma === "esp") {
    return (
      <>
        <p>
          ATENCIÓN: si es la primera vez que haces staking, necesitarás aprobar
          este contrato inteligente en tu MetaMask. Para ello, simplemente haz
          clic en "Habilitar Staking". Luego, tu MetaMask te pedirá confirmación
          y cobrará la tasa de gas que es única y típica para este tipo de
          transacción.
        </p>
        <p>
          Después, podrás hacer clic en "Fazer staking". Una vez más, tu
          MetaMask solicitará confirmación para pagar la tasa de gas de la red.
          Hecho esto, el staking se habrá completado.
        </p>
      </>
    );
  }

  if (idioma === "eng") {
    return (
      <>
        <p>
          ATTENTION: If this is your first time staking, you will need to
          approve this smart contract in your MetaMask. To do so, simply click
          on "Enable Staking". Then, your MetaMask will ask for your
          confirmation and charge the gas fee that is unique and typical for
          this type of transaction.
        </p>
        <p>
          Afterward, you can click on "Stake". Once again, your MetaMask will
          request your confirmation to pay the network gas fee. Once done, the
          staking will be complete.
        </p>
      </>
    );
  }
};

export const textoStaking = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Staking Padrão </h1>

        <p>
          Esse é o "Staking Padrão" de AutoMiningToken. Aqui você pode depositar
          seus AMTs e receber BTCB diariamente.
        </p>
        <p>
          A quantia a ser recebida é proporcional a quantidade de tokens que
          você deposita.
        </p>
        <p>
          Você pode simular seus recebimentos <u>clicando aquí.</u>
        </p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>Staking Estándar</h1>

        <p>
          Este es el "Staking Estándar" de AutoMiningToken. Aquí puede depositar
          sus AMTs y recibir BTCB diariamente.
        </p>
        <p>
          La cantidad a recibir es proporcional a la cantidad de tokens que
          deposita.
        </p>
        <p>
          Puede simular sus ganancias <u>haciendo clic aquí.</u>
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>Standard Staking</h1>

        <p>
          This is the "Standard Staking" of AutoMiningToken. Here you can
          deposit your AMTs and receive BTCB daily.
        </p>
        <p>
          The amount to be received is proportional to the amount of tokens you
          deposit.
        </p>
        <p>
          You can simulate your earnings <u>by clicking here.</u>
        </p>
      </>
    );
  }
};

export const textoAtencionStaking = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <b>
          <p>
            ATENÇÃO: se deseja depositar mais tokens em staking, é preciso sacar
            seus AMT que já estão depositados, para depois fazer um novo
            depósito na quantia que desejar.
          </p>
          <p>
            Caso o seu interesse seja em aumentar a sua posição em AMT
            constantemente, conheça o <u>Staking de Recompra.</u>
          </p>
        </b>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <b>
          <p>
            ATENCIÓN: si desea depositar más tokens en staking, es necesario
            retirar sus AMT ya depositados para luego realizar un nuevo depósito
            con la cantidad deseada.
          </p>
          <p>
            Si su interés es aumentar constantemente su posición en AMT, conozca
            el <u>Staking de Recompra.</u>
          </p>
        </b>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <b>
          <p>
            ATTENTION: if you want to deposit more tokens in staking, you need
            to withdraw your already deposited AMT, and then make a new deposit
            with the desired amount.
          </p>
          <p>
            If your interest is to constantly increase your position in AMT,
            check out the <u>Repurchase Staking.</u>
          </p>
        </b>
      </>
    );
  }
};
export const textoGInvestidores = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Grandes Investidores</h1>
        <p>
          Esta página é destinada aos investidores que preferem pagar a taxa de
          gás diariamente, mas manter os seus tokens em sua MetaMask.
        </p>
        <p>
          Por isso, não recomendamos aos pequenos investidores, isto é, para que
          não corram o risco de prejudicar a sua rentabilidade tendo que pagar
          taxas.
        </p>
        <p>
          Aos investidores que não desejam pagar a taxa diária, mas sim acumular
          rendimentos em bitcoin todos os dias, de forma automática, nós
          recomendamos que coloque seus tokens em staking. Clique aqui e veja
          suas opções.
        </p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>Grandes Inversores</h1>
        <p>
          Esta página está destinada a los inversores que prefieren pagar la
          tarifa de gas diariamente, pero mantener sus tokens en su MetaMask.
        </p>
        <p>
          Por lo tanto, no recomendamos a los pequeños inversores, es decir,
          para que no corran el riesgo de perjudicar su rentabilidad teniendo
          que pagar tarifas.
        </p>
        <p>
          A los inversores que no desean pagar la tarifa diaria, sino acumular
          rendimientos en bitcoin todos los días, de forma automática, les
          recomendamos que pongan sus tokens en staking. Haga clic aquí y vea
          sus opciones.
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>Big Investors</h1>
        <p>
          This page is intended for investors who prefer to pay the daily gas
          fee, but keep their tokens in their MetaMask wallet.
        </p>
        <p>
          Therefore, we do not recommend this to small investors, so that they
          do not risk harming their profitability by having to pay fees.
        </p>
        <p>
          For investors who do not want to pay the daily fee, but instead
          accumulate bitcoin returns automatically every day, we recommend
          putting their tokens in staking. Click here to see your options.
        </p>
      </>
    );
  }
};

export const textoLiquidez = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Prover liquidez</h1>
        <p>
          Nessa modalidade de investimento, você passa a receber
          proporcionalmente por cada uma das transações que são realizadas no
          nosso pool de liquidez (na PancakeSwap).
        </p>
        <p>
          A vantagem de prover liquidez pelo nosso site é que, além da
          participação nas transações, os seus AMT continuam trabalhando por
          você gerando rendimentos em BTCB.
        </p>
        <p>
          Para contribuir com a liquidez, é preciso adicionar quantias de BTCB e
          AMT que sejam equivalentes em seu valor.
        </p>
        <p>
          Caso você ainda não possua BTCB, você pode trocar parte dos seus AMT
          por BTCB, dividindo em duas partes iguais o valor total de seu
          investimento.
        </p>
        <p>
          Cobra-se taxa de gás apenas ao depositar e ao retirar os tokens, além
          da taxa da aprovação do Smart Contract.
        </p>
        <p>
          Não é possível prever quantos AMT ou BTCB você poderá receber, pois
          depende das transações realizadas no pool de liquidez e da relação de
          valor entre as duas moedas.
        </p>
      </>
    );
  }

  if (idioma === "esp") {
    return (
      <>
        <h1>Proveer Liquidez</h1>
        <p>
          En esta modalidad de inversión, recibirá proporcionalmente por cada
          una de las transacciones que se realicen en nuestro pool de liquidez
          (en PancakeSwap).
        </p>
        <p>
          La ventaja de proveer liquidez a través de nuestro sitio es que,
          además de participar en transacciones, sus tokens AMT continúan
          trabajando para usted, generando ganancias en BTCB.
        </p>
        <p>
          Para contribuir a la liquidez, es necesario agregar cantidades
          equivalentes de BTCB y tokens AMT en función de sus respectivos
          valores.
        </p>
        <p>
          Si aún no tiene BTCB, puede intercambiar parte de sus tokens AMT por
          BTCB, dividiendo el valor total de su inversión en dos partes iguales.
        </p>
        <p>
          Solo se cobran tarifas de gas al depositar y retirar tokens, además de
          la tarifa de aprobación del Smart Contract.
        </p>
        <p>
          No es posible predecir cuántos tokens AMT o BTCB recibirá, ya que
          depende de las transacciones realizadas en el pool de liquidez y de la
          relación de valor entre las dos monedas.
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>Provide Liquidity</h1>
        <p>
          In this investment modality, you will receive proportionally for each
          of the transactions that are made in our liquidity pool (on
          PancakeSwap).
        </p>
        <p>
          The advantage of providing liquidity through our site is that, in
          addition to participating in transactions, your AMT tokens continue to
          work for you, generating earnings in BTCB.
        </p>
        <p>
          To contribute to liquidity, it is necessary to add equivalent amounts
          of BTCB and AMT tokens based on their respective values.
        </p>
        <p>
          If you do not yet have BTCB, you can exchange part of your AMT tokens
          for BTCB, dividing the total value of your investment into two equal
          parts.
        </p>
        <p>
          Gas fees are charged only when depositing and withdrawing tokens, in
          addition to the approval fee for the Smart Contract.
        </p>
        <p>
          It is not possible to predict how many AMT or BTCB tokens you will
          receive, as it depends on the transactions made in the liquidity pool
          and the value ratio between the two currencies.
        </p>
      </>
    );
  }
};

export const textoRendimientos = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Quanto rende o AMT?</h1>
        <p>
          A rentabilidade do AMT depende de alguns fatores, como:
          <div>
            <ul>Preço pago por token (AMT)</ul>
            <ul>Preço do Bitcoin</ul>
            <ul>Taxa de dificuldade da rede de mineração</ul>
            <ul>Custos da operação, principalmente a energia elétrica</ul>
            <ul>Poder computacional utilizado para minerar</ul>
          </div>
        </p>
        <p>
          A maioria dessas variáveis estão em constante mudança, e são alheias
          ao Projeto AMT, de modo que não é possível garantir determinada
          rentabilidade.
        </p>
        <p>
          O que é possível fazer é simular a rentabilidade tomando como base os
          parâmetros de momento atual, como se fossem constantes - mas não são
        </p>
        <p>Confira abaixo mais detalhes.</p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>¿Cuánto rinde el AMT?</h1>
        <p>
          La rentabilidad del AMT depende de algunos factores, como:
          <div>
            <ul>Precio pagado por token (AMT)</ul>
            <ul>Precio de Bitcoin</ul>
            <ul>Tasa de dificultad de la red de minería</ul>
            <ul>Costos de la operación, principalmente la energía eléctrica</ul>
            <ul>Poder computacional utilizado para minar</ul>
          </div>
        </p>
        <p>
          La mayoría de estas variables están en constante cambio, y son ajenas
          al Proyecto AMT, por lo que no es posible garantizar determinada
          rentabilidad.
        </p>
        <p>
          Lo que es posible hacer es simular la rentabilidad tomando como base
          los parámetros del momento actual, como si fueran constantes - pero no
          lo son.
        </p>
        <p>Consulte más detalles a continuación.</p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>How much does AMT yield?</h1>
        <p>
          The profitability of AMT depends on several factors, such as:
          <div>
            <ul>Price paid per token (AMT)</ul>
            <ul>Price of Bitcoin</ul>
            <ul>Network mining difficulty rate</ul>
            <ul>Operation costs, mainly electricity</ul>
            <ul>Computational power used for mining</ul>
          </div>
        </p>
        <p>
          Most of these variables are constantly changing, and are external to
          the AMT Project, so it is not possible to guarantee any specific
          profitability.
        </p>
        <p>
          What is possible is to simulate the profitability based on current
          parameters, as if they were constants - but they are not.
        </p>
        <p>See more details below.</p>
      </>
    );
  }
};

export const textoStakingAmt = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Staking de Autocompra de AMT</h1>
        <p>
          No "Staking de Autocompra" do AutoMiningToken, seus rendimentos em
          bitcoin compram mais AMT todos os dias para você, de forma automática
          e livre de taxas.
        </p>
        <p>
          O investidor paga taxa de gás apenas ao colocar e retirar seus tokens
          na Autocompra. As taxas cobradas pelas compras diárias e automáticas
          são pagas pelo AMT.
        </p>
        <p>
          Na prática, à medida que a quantidade de AMT aumenta, seus rendimentos
          também aumentam, mais AMT são comprados, e assim por diante, de modo
          que funciona como um juro composto.
        </p>
        <p>
          Você pode simular seus recebimentos <u>clicando aqui</u>.
        </p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>Staking de Autocompra de AMT</h1>
        <p>
          En el "Staking de Autocompra" de AutoMiningToken, tus rendimientos en
          bitcoin compran más AMT todos los días para ti, de forma automática y
          libre de comisiones.
        </p>
        <p>
          El inversor solo paga la tarifa de gas al depositar y retirar sus
          tokens de Autocompra. Las tarifas cobradas por las compras diarias y
          automáticas son pagadas por AMT.
        </p>
        <p>
          En la práctica, a medida que la cantidad de AMT aumenta, tus
          rendimientos también aumentan, se compran más AMT y así sucesivamente,
          de modo que funciona como un interés compuesto.
        </p>
        <p>
          Puedes simular tus rendimientos <u>haciendo clic aquí</u>.
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>AMT Autobuy Staking</h1>
        <p>
          In AutoMiningToken's "Autobuy Staking," your bitcoin earnings buy more
          AMT for you every day, automatically and free of charge.
        </p>
        <p>
          Investors only pay gas fees when depositing and withdrawing tokens
          from Autobuy. The fees charged for daily and automatic purchases are
          paid by AMT.
        </p>
        <p>
          In practice, as the amount of AMT increases, so do your earnings, more
          AMT is purchased, and so on, making it work like compound interest.
        </p>
        <p>
          You can simulate your earnings <u>by clicking here</u>.
        </p>
      </>
    );
  }
};

export const textoInterfaz1Inch = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h1>Interface 1 inch</h1>
        <p>Primeiro parágrafo</p>
        <p>Mais texto no segundo parágrafo</p>
        <p>E chegamos ao terceiro parágrafo!</p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h1>Interfaz 1 inch</h1>
        <p>Primer párrafo</p>
        <p>Más texto en el segundo párrafo</p>
        <p>¡Y llegamos al tercer párrafo!</p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h1>1 inch Interface</h1>
        <p>First paragraph</p>
        <p>More text in the second paragraph</p>
        <p>And we've reached the third paragraph!</p>
      </>
    );
  }
};

export const simuleRentabilidad = (idioma: string) => {
  if (idioma == "por") {
    return (
      <>
        <h2>Simule a rentabilidade</h2>
        <p>
          A rentabilidade de AMT depende de algumas variáveis e, aqui, você pode
          alterar duas delas para verificar quanto o AMT pode render em
          diferentes cenários.
        </p>

        <p>
          Essas duas variáveis são: preço de AMT ao investir e o preço de
          Bitcoin.
        </p>

        <p>
          Por padrão, utiliza-se os preços vigentes em tempo real, levando em
          consideração a taxa de dificuldade da rede de mineração atual.
        </p>
      </>
    );
  }

  if (idioma == "esp") {
    return (
      <>
        <h2>Simulación de Rentabilidad</h2>
        <p>
          La rentabilidad de AMT depende de algunas variables y aquí puede
          cambiar dos de ellas para verificar cuánto puede generar AMT en
          diferentes escenarios.
        </p>

        <p>
          Estas dos variables son: el precio de AMT al invertir y el precio de
          Bitcoin.
        </p>

        <p>
          Por defecto, se utilizan los precios vigentes en tiempo real, teniendo
          en cuenta la tasa de dificultad de la red de minería actual.
        </p>
      </>
    );
  }

  if (idioma == "eng") {
    return (
      <>
        <h2>Simulate profitability</h2>
        <p>
          The profitability of AMT depends on some variables, and here you can
          change two of them to see how much AMT can generate in different
          scenarios.
        </p>

        <p>
          These two variables are: the price of AMT when investing and the price
          of Bitcoin.
        </p>

        <p>
          By default, current real-time prices are used, taking into account the
          current mining network difficulty rate.
        </p>
      </>
    );
  }
};

export const textoRetirarLiquidez = (idioma: string) => {
  if (idioma === "por") {
    return (
      <>
        <h1>Detalhes</h1>
        <p>
          A quantidade de cada moeda varia para que a relação de valor investida
          em cada token seja mantida.
        </p>
        <p>
          Portanto, quando, por exemplo, AMT se valoriza em relação a BTCB, o
          investidor terá menos AMT e mais BTCB, e vice-versa.
        </p>
        <p>
          O melhor momento para retirar os tokens de liquidez depende da
          estratégia e dos interesses do investidor.
        </p>
        <p>
          Ao retirar a liquidez, o investidor aceita a quantidade de tokens que
          lhe corresponde no momento da retirada.
        </p>
      </>
    );
  }
  if (idioma === "esp") {
    return (
      <>
        {" "}
        <h1>Detalles</h1>
        <p>
          La cantidad de cada moneda varía para que se mantenga la relación de
          valor invertida en cada token
        </p>
        <p>
          Entonces, cuando por ejemplo AMT se valoriza contra BTCB, el inversor
          tendra menos AMT y más BTCB, y viceversa
        </p>
        <p>
          El mejor momento para retirar los tokens de liquidez dependerá de la
          estrategia y los intereses del inversor
        </p>
        <p>
          Al retirar la liquidez el inversor acepta la cantidad de tokens que le
          corresponden en el momento de la retirada
        </p>
      </>
    );
  }
  if (idioma === "eng") {
    return (
      <>
        <h1>Details</h1>
        <p>
          The amount of each currency varies so that the invested value ratio is
          maintained in each token.
        </p>
        <p>
          Therefore, when for example AMT appreciates against BTCB, the investor
          will have less AMT and more BTCB, and vice versa.
        </p>
        <p>
          The best time to withdraw liquidity tokens depends on the investor's
          strategy and interests.
        </p>
        <p>
          When withdrawing liquidity, the investor accepts the amount of tokens
          corresponding to them at the time of withdrawal.
        </p>
      </>
    );
  }
};

/******************/
/******************/

export const nombre = (idioma: string) => {
  if (idioma == "por") {
    return;
  }

  if (idioma == "esp") {
  }

  if (idioma == "eng") {
  }
};

/******************/
/******************/

// Textos extra
export interface interfaceTextoExtra {
  bienvenido: string;
  textoConexion: string;
  conectarBilletera: string;
  market: string;
  comprar: string;
  aprobar: string;
  cobrar: string;
  yaCobrado: string;
  bceInsuf: string;
  stake: string;
  depositarAmt: string;
  saldo: string;
  amtDepositados: string;
  precioAmt: string;
  btcACobrar: string;
  distribucion: string;
  sepaMas: string;
  aprobarBTCB: string;
  aprobarUSDT: string;
  aprobarAMT: string;
  aprobarLiqAmt: string;
  bceAmtInsuficiente: string;
  bceBtcInsuficiente: string;
  bceUSDTInsuficiente: string;
  bceLiqAmtInsuficiente: string;
  proveerLiquidez: string;
  quemar: string;
  importarTokens: string;
  noHaytantosAmtEnVenta: string;
  ustedPaga: string;
  ustedRecibe: string;
  amtEnVenta: string;
  consultarHistorico: string;
  inversiones: string;
  retirar: string;
  btcbAcumulados: string;
  amtGenerados: string;
  participacionEnPool: string;
  tuLiquidezYRetirar: string;
  cantidadAMT: string;
  escenarioActual: string;
  simularEscenario: string;
  valorPagoAmtDolar: string;
  valorBtcEnDolar: string;
  rentaDiaria: string;
  rentaMensual: string;
  rentaAnual: string;
  autocompraDiaria: string;
  enEseEscenarioRentabilidadSeria: string;
}
export type typeTextosExtra = {
  [key in languageCode]: interfaceTextoExtra;
};

export const textosExtra: typeTextosExtra = {
  por: {
    bienvenido: "Bem-vindo!",
    textoConexion:
      "Para navegar pelo site, conecte a sua Metamask, clickando no botao abaixo.",
    market: "Market",

    conectarBilletera: "Conectar carteira",
    comprar: "Comprar",
    aprobar: "Aprobar",
    cobrar: "Cobrar",
    yaCobrado: "Já cobrado",
    bceInsuf: "Balance insuficiente",

    stake: "Stake",

    depositarAmt: "Depositar AMT:",

    saldo: "Saldo:",

    amtDepositados: "AMT depositados:",
    precioAmt: "Preco do AMT:",

    btcACobrar: "BTC a cobrar:",
    distribucion: "Distribucion:",

    sepaMas: "Saiba maís",

    //Añadidos pero para ver si iria aca
    aprobarBTCB: "Aprobar BTCB",
    aprobarUSDT: "Aprobar USDT",
    aprobarAMT: "Aprobar AMT",
    aprobarLiqAmt: "Aprobar LiqAmt",

    bceAmtInsuficiente: "Balance AMT insuficiente",
    bceBtcInsuficiente: "Balance BTC insuficiente",
    bceUSDTInsuficiente: "Balance USDT insuficiente",
    bceLiqAmtInsuficiente: "Balance LiqAmt insuficiente",

    quemar: "Quemar",

    proveerLiquidez: "Dar liquidez",
    importarTokens: "Importar tokens",
    noHaytantosAmtEnVenta: "Não há AMT suficientes à venda",
    ustedPaga: "Vocé paga:",
    ustedRecibe: "Vocé recebe:",
    amtEnVenta: "AMT a venda:",
    consultarHistorico: "Consultar histórico",
    inversiones: "Investimentos",
    retirar: "Retirar",
    btcbAcumulados: "BTCB gerados",
    amtGenerados: "AMT gerados",
    participacionEnPool: "Participação total no pool:",
    tuLiquidezYRetirar: "Sua liquidez e liquidez para saque",
    cantidadAMT: "Quantidade de AMT: ",
    escenarioActual: "Cenário atual",
    simularEscenario: "Simular cenário",
    valorPagoAmtDolar: "Valor pago por AMT en dólar:",
    valorBtcEnDolar: "Insira valor do Bitcoin em dólar: ",
    rentaDiaria: "Renda diária",
    rentaMensual: "Renda mensal",
    rentaAnual: "Renda anual",
    autocompraDiaria: "Autocompra diária:",
    enEseEscenarioRentabilidadSeria: "Nesse cenário, rentabilidade seria:",
  },
  esp: {
    bienvenido: "¡Bienvenido!",
    textoConexion:
      "Para navegar por el sitio, conecte su Metamask haciendo clic en el botón de abajo.",
    market: "Mercado",
    conectarBilletera: "Conectar billetera",

    comprar: "Comprar",
    aprobar: "Aprobar",
    cobrar: "Cobrar",
    yaCobrado: "Ya cobrado",
    bceInsuf: "Saldo insuficiente",

    stake: "Stake",

    depositarAmt: "Depositar AMT:",

    saldo: "Saldo:",

    amtDepositados: "AMT depositados:",
    precioAmt: "Precio de AMT:",

    btcACobrar: "BTC a cobrar:",
    distribucion: "Distribución:",

    sepaMas: "Sepa más",

    aprobarBTCB: "Aprobar BTCB",
    aprobarUSDT: "Aprobar USDT",
    aprobarAMT: "Aprobar AMT",
    aprobarLiqAmt: "Aprobar LiqAmt",

    bceAmtInsuficiente: "Saldo AMT insuficiente",
    bceBtcInsuficiente: "Saldo BTC insuficiente",
    bceUSDTInsuficiente: "Saldo USDT insuficiente",
    bceLiqAmtInsuficiente: "Saldo LiqAmt insuficiente",

    quemar: "Quemar",

    proveerLiquidez: "Proporcionar liquidez",
    importarTokens: "Importar tokens",
    noHaytantosAmtEnVenta: "No hay tantos AMT en venta",
    ustedPaga: "Usted paga:",
    ustedRecibe: "Usted recibe:",
    amtEnVenta: "AMT en venta:",
    consultarHistorico: "Consultar Historico",
    inversiones: "Inversiones",
    retirar: "Retirar",
    btcbAcumulados: "BTCB acumulados",
    amtGenerados: "AMT generados",
    participacionEnPool: "Participación total en pool:",
    tuLiquidezYRetirar: "Tu liquidez y retirar liquidez",
    cantidadAMT: "Cantidad de AMT: ",
    escenarioActual: "Escenario Actual",
    simularEscenario: "Simular Escenario",
    valorPagoAmtDolar: "Valor pagado por AMT en dólares:",
    valorBtcEnDolar: "Inserte el valor de Bitcoin en dólares:",
    rentaDiaria: "Renta diaria",
    rentaMensual: "Renta mensual",
    rentaAnual: "Renta anual",
    autocompraDiaria: "Autocompra diaria:",
    enEseEscenarioRentabilidadSeria:
      "En este escenario, la rentabilidad sería:",
  },
  eng: {
    bienvenido: "Welcome!",
    textoConexion:
      "To browse the site, connect your Metamask by clicking the button below.",
    market: "Market",
    conectarBilletera: "Connect wallet",

    comprar: "Buy",
    aprobar: "Approve",
    cobrar: "Claim",
    yaCobrado: "Already claimed",
    bceInsuf: "Insufficient balance",
    stake: "Stake",
    depositarAmt: "Deposit AMT:",
    saldo: "Balance:",
    amtDepositados: "Deposited AMT:",
    precioAmt: "AMT price:",
    btcACobrar: "BTC to claim:",
    distribucion: "Distribution:",
    sepaMas: "Learn more",
    aprobarBTCB: "Approve BTCB",
    aprobarUSDT: "Approve USDT",
    aprobarAMT: "Approve AMT",
    aprobarLiqAmt: "Approve LiqAmt",
    bceAmtInsuficiente: "Insufficient AMT balance",
    bceBtcInsuficiente: "Insufficient BTC balance",
    bceUSDTInsuficiente: "Insufficient USDT balance",
    bceLiqAmtInsuficiente: "Insufficient LiqAmt balance",
    quemar: "Burn",
    proveerLiquidez: "Provide liquidity",
    importarTokens: "Import tokens",
    noHaytantosAmtEnVenta: "There are not enough AMT for sale",
    ustedPaga: "You pay:",
    ustedRecibe: "You recive:",
    amtEnVenta: "Amt for sale:",
    consultarHistorico: "Check history",
    inversiones: "Investments",
    retirar: "Withdraw",
    btcbAcumulados: "Accumulated BTCB",
    amtGenerados: "Generated AMT",
    participacionEnPool: "Total participation in pool:",
    tuLiquidezYRetirar: "Your liquidity and withdrawl liquidity",
    cantidadAMT: "Amount of AMT: ",
    escenarioActual: "Current Scenario",
    simularEscenario: "Simulate Scenario",
    valorPagoAmtDolar: "Value paid per AMT in dollars:",
    valorBtcEnDolar: "Insert the value of Bitcoin in dollars:",
    rentaDiaria: "Daily income",
    rentaMensual: "Monthly income",
    rentaAnual: "Annual income",
    autocompraDiaria: "Daily autoreinvestment:",
    enEseEscenarioRentabilidadSeria:
      "In this scenario, the profitability would be:",
  },
};

//Textos botones blancos
export interface interfaceBotonBlancoIndividual {
  titulo: string;
  descripcion: string;
}
export interface interfaceBotonesBlancos {
  market: interfaceBotonBlancoIndividual;
  investimentos: interfaceBotonBlancoIndividual;
  gInvestidores: interfaceBotonBlancoIndividual;
  store: interfaceBotonBlancoIndividual;
  pancake: interfaceBotonBlancoIndividual;
  quema: interfaceBotonBlancoIndividual;
  pix: interfaceBotonBlancoIndividual;
  staking: interfaceBotonBlancoIndividual;
  stakingAmt: interfaceBotonBlancoIndividual;
  liquidez: interfaceBotonBlancoIndividual;
  rendimientos: interfaceBotonBlancoIndividual;
  simulador: interfaceBotonBlancoIndividual;
  simuladorActual: interfaceBotonBlancoIndividual;
  maquinas: interfaceBotonBlancoIndividual;
  grafico: interfaceBotonBlancoIndividual;
}

export type typeTextoBotonesBlancos = {
  [key in languageCode]: interfaceBotonesBlancos;
};
export const textoBotonesBlancos: typeTextoBotonesBlancos = {
  por: {
    market: {
      titulo: "Market",
      descripcion: "Compre e venda AMT!",
    },
    investimentos: {
      titulo: "Investimentos",
      descripcion: "Faca seus AMT reinderem mais!",
    },
    gInvestidores: {
      titulo: "Grandes investidores",
      descripcion: "Consulte a distribucao de lucros.",
    },
    store: {
      titulo: "AMT Store",
      descripcion: "Compre AMT diretamente do nosso site.",
    },
    pancake: {
      titulo: "PancakeSwap",
      descripcion: "Utilize nosso site para comprar via PancakeSwap.",
    },
    quema: {
      titulo: "Venda AMT",
      descripcion: "Troque AMT por BTCB no Cofre de Garantía.",
    },
    pix: {
      titulo: "Compre e venda cripto con PIX",
      descripcion: "Disponível apenas para usuários no Brasil.",
    },
    staking: {
      titulo: "Staking Padrão",
      descripcion: "Receba mais BTCB diariamente.",
    },
    stakingAmt: {
      titulo: "Staking de Autocompra de AMT",
      descripcion: "Receba mais AMT diariamente.",
    },
    liquidez: {
      titulo: "Liquidez",
      descripcion: "Receba pelas transacoes no pool de liquidez.",
    },
    rendimientos: {
      titulo: "Quanto rende o AMT?",
      descripcion: "Entenda e simule a rentabilidade do AMT.",
    },
    simulador: {
      titulo: "Simule a rentabilidade",
      descripcion: "Confira quanto rende o AMT em diferentes cenários",
    },
    simuladorActual: {
      titulo: "Rentabilidad de staking agora",
      descripcion: "Confira quanto rende o AMT no cenário atual",
    },
    maquinas: {
      titulo: "Máquinas ativas no Projeto AMT",
      descripcion: "Confira nossa producao diária de bitcoins",
    },
    grafico: {
      titulo: "Gráfico de preco de AMT",
      descripcion: "confira o valor do AMT contra o BTC e USDT",
    },
  },
  esp: {
    market: {
      titulo: "Mercado",
      descripcion: "¡Compre y venda AMT!",
    },
    investimentos: {
      titulo: "Inversiones",
      descripcion: "¡Haga que sus AMT rindan más!",
    },
    gInvestidores: {
      titulo: "Grandes inversores",
      descripcion: "Consulte la distribución de ganancias.",
    },
    store: {
      titulo: "Tienda AMT",
      descripcion: "Compre AMT directamente desde nuestro sitio.",
    },
    pancake: {
      titulo: "PancakeSwap",
      descripcion:
        "Utilice nuestro sitio para comprar a través de PancakeSwap.",
    },
    quema: {
      titulo: "Venda AMT",
      descripcion: "Cambia AMT por BTCB en el Cofre de Garantía.",
    },
    pix: {
      titulo: "Compra y venta de criptomonedas con PIX",
      descripcion: "Disponible solo para usuarios en Brasil.",
    },
    staking: {
      titulo: "Staking estándar",
      descripcion: "Recibe más BTCB diariamente.",
    },
    stakingAmt: {
      titulo: "Staking de Autocompra de AMT",
      descripcion: "Recibe más AMT diariamente.",
    },
    liquidez: {
      titulo: "liquidez",
      descripcion: "Recibe por las transacciones en el pool de liquidez.",
    },
    rendimientos: {
      titulo: "¿Cuánto rinde AMT?",
      descripcion: "Comprenda y simule la rentabilidad de AMT.",
    },
    simulador: {
      titulo: "Simule la rentabilidad",
      descripcion: "Confira cuánto rinde AMT en diferentes escenarios",
    },
    simuladorActual: {
      titulo: "Rentabilidad del staking ahora",
      descripcion: "Confira cuánto rinde AMT en el escenario actual",
    },
    maquinas: {
      titulo: "Máquinas activas en el proyecto AMT",
      descripcion: "Confira nuestra producción diaria de bitcoins",
    },
    grafico: {
      titulo: "Gráfico de precio de AMT",
      descripcion: "Confira el valor de AMT contra BTC y USDT",
    },
  },
  eng: {
    market: {
      titulo: "Market",
      descripcion: "Buy and sell AMT!",
    },
    investimentos: {
      titulo: "Investments",
      descripcion: "Make your AMT generate more!",
    },
    gInvestidores: {
      titulo: "Big investors",
      descripcion: "Check profit distribution.",
    },
    store: {
      titulo: "AMT Store",
      descripcion: "Buy AMT directly from our site.",
    },
    pancake: {
      titulo: "PancakeSwap",
      descripcion: "Use our site to buy via PancakeSwap.",
    },
    quema: {
      titulo: "Sell AMT",
      descripcion: "Exchange AMT for BTCB in the Guarantee Chest.",
    },
    pix: {
      titulo: "Buy and sell crypto with PIX",
      descripcion: "Available only to users in Brazil.",
    },
    staking: {
      titulo: "Standard Staking",
      descripcion: "Receive more BTCB daily.",
    },
    stakingAmt: {
      titulo: "Autobuy AMT Staking",
      descripcion: "Receive more AMT daily.",
    },
    liquidez: {
      titulo: "Liquidity",
      descripcion: "Get paid for transactions in the liquidity pool.",
    },
    rendimientos: {
      titulo: "How much does AMT yield?",
      descripcion: "Understand and simulate AMT profitability.",
    },
    simulador: {
      titulo: "Simulate profitability",
      descripcion: "Check how much AMT yields in different scenarios",
    },
    simuladorActual: {
      titulo: "Current staking profitability",
      descripcion: "Check how much AMT yields in the current scenario",
    },
    maquinas: {
      titulo: "Active machines in the AMT Project",
      descripcion: "Check our daily bitcoin production",
    },
    grafico: {
      titulo: "AMT price chart",
      descripcion: "check the value of AMT against BTC and USDT",
    },
  },
};
